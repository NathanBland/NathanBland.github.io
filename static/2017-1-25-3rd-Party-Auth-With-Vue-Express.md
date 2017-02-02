Today my goal is to create a dead simple `node.js` application that combines itself with `vue.js` to allow 3rd party authentication flow within a SPA application.

I've created [simple authentication examples before](https://github.com/NathanBland/guarded) but this one is a little different.
My whole goal with this project is to accomplish something that has been evading me since I first found vue a few months ago.
Authentication is something that got really easy once libraries like `passport.js` came on to the scene, 
but got significantly harder once you tried to combine those libraries with a single page application, at least for me.

*This article pulls heavily from a [scotch.io](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens#introduction) 
article on using `jsonwebtoken`, be sure to check it out.*

# The Tech
I'm going to try to do this project with a few technologies I'm already familiar with to keep the learning curve down.
- node.js
  - For the server
- express.js
  - For the REST api running on node
- body-parser
  - Module for parsing HTTP requests with a body
- mongoose
  - Library to make interacting with mongodb easier. 
- Vue.js 
  - Front-end framework
- Vue 2 webpack template
  - Boilerplate for running nicely with vue and webpack
- Vue-router
  - Client side routing framework for vue.js
- Axios
  - Client side HTTP request library
- Vuex
  - Client side state management for vue.js
- Passport.js
  - Library to aid in handling 3rd party auth requests
- morgan
  - Utility library for logging
- node-jsonwebtoken
  - Utility to create/validate web token for authentication
- nodemon 
  - Live reloads of api
  
That's a lot of depenencies, but I think it's important to know what tech I plan on using before I start.
Where I can I'll also be using `es6` syntax as much as possible. 

*I should say that this will not be a pretty application. At least not at this stage*

# Setting up
I use gitHub to manage my open source repositories so first I'm going to create a reposity there, and clone it.

```bash
~/Projects $ git clone https://github.com/NathanBland/vue-spa-oauth.git
Cloning into 'vue-spa-oauth'...
remote: Counting objects: 5, done.
remote: Compressing objects: 100% (5/5), done.
remote: Total 5 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (5/5), done.
Checking connectivity... done.
```

I'm going to keep my client side code seperate from my server side code, so I'll make those directories as well.

First I'll generate my ui folder, since that's easy with `vue-cli`

```bash
~/Projects/vue-spa-oauth $ vue init webpack ui

  This will install Vue 2.x version of the template.

  For Vue 1.x use: vue init webpack#1.0 ui

? Project name ui
? Project description A Vue.js oauth example
? Author Nathan Bland <nathan.bland@gmail.com>
? Vue build standalone
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Setup unit tests with Karma + Mocha? No
? Setup e2e tests with Nightwatch? No

   vue-cli · Generated "ui".

   To get started:
   
     cd ui
     npm install
     npm run dev
   
   Documentation can be found at https://vuejs-templates.github.io/webpack
```

Now for the server side setup...

```bash
~/Projects/vue-spa-oauth $ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (vue-spa-oauth) 
version: (1.0.0) 
description: 
entry point: (index.js) server.js
test command: 
git repository: (https://github.com/NathanBland/vue-spa-oauth.git) 
keywords: vue.js, oauth, auth, twitter
license: (ISC) MIT
About to write to /home/nathan/Projects/vue-spa-oauth/package.json:

{
  "name": "vue-spa-oauth",
  "version": "1.0.0",
  "description": "An example project for oauth authentication with vue.js",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/NathanBland/vue-spa-oauth.git"
  },
  "keywords": [
    "vue.js",
    "oauth",
    "auth",
    "twitter"
  ],
  "author": "Nathan Bland <nathan.bland@gmail.com> (https://nathanbland.github.io/)",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/NathanBland/vue-spa-oauth/issues"
  },
  "homepage": "https://github.com/NathanBland/vue-spa-oauth#readme"
}


Is this ok? (yes)
```

And then install all of my dependencies

```bash 
~/Projects/vue-spa-oauth $ npm i --save express body-parser mongoose morgan jsonwebtoken
```

Next up is directories
```bash 
 ~/Projects/vue-spa-oauth $ mkdir models public routes
 ```
 Then our base files
 
 ```bash
 ~/Projects/vue-spa-oauth $ touch server.js config.js models/user.js
 ```
 
 
# The Code
Now I've opened this up in my favorite editor, which at the time of this writing, is vs code.
 
In `models/user.js`

```js
// get an instance of mongoose and mongoose.Schema
let mongoose = require('mongoose')
let Schema = mongoose.Schema

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
  name: String, 
  password: String, 
  admin: Boolean 
}))
```

And then `config.js`
```js
module.exports = {
  'secret': 'vuejustwantstobeloved',
  'database': 'mongodb://localhost:27017/vue-oauth'
}
```

Finally let's get to `server.js`
```js
// =======================
// get the packages we need ============
// =======================
const express     = require('express')
const app         = express()
const bodyParser  = require('body-parser')
const morgan      = require('morgan')
const mongoose    = require('mongoose')
const routes      = require('./routes/')
const jwt    = require('jsonwebtoken') // used to create, sign, and verify tokens
const config = require('./config') // get our config file
const User   = require('./models/user') // get our mongoose model
    
// =======================
// configuration =========
// =======================
const port = process.env.PORT || 8000 // used to create, sign, and verify tokens
const server = require('http').Server(app)
mongoose.Promise = global.Promise
mongoose.connect(config.database) // connect to database
app.set('superSecret', config.secret) // secret variable

app.use(express.static('public'))

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// use morgan to log requests to the console
app.use(morgan('dev'))
// =======================
// start the server ======
// =======================
app.get('/', (req, res) => {
    res.send('Hello! The API is at http://localhost:' + port + '/api')
})

app.use('/api', routes(express))

server.listen(port)
console.log('Magic happens at http://localhost:' + port)
```

At this point in the article from scotch.io, you can start up and see the server running:

```bash
~/Projects/vue-spa-oauth $ nodemon server.js 
Magic happens at http://localhost:8000
```

Then open that link and get a response logged

```bash
~ $ curl localhost:8000
Hello! The API is at http://localhost:8000/api
```

```bash
 ~/Projects/vue-spa-oauth $ nodemon server.js 
[nodemon] 1.10.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node server.js`
Magic happens at http://localhost:8000
GET / 200 2.851 ms - 46

```
That's morgan giving us the logs, which is handy.

I ended up splitting out the routes to their own folder structure, for sanity's sake.

You'll need to make the `routes/index.js` file to be on the same page as my code, with the following contents:

```js
module.exports = (express) => {
  const router = express.Router()
  const jwt = require('jsonwebtoken')
  
  router.get('/', (req, res, next) => {
    console.log('route hit')
    return res.json({msg: 'Welcome to the api'})
  })
  return router
}
```

However, after all the help that the scotch article has been, we are starting to move away from what it is trying to do.

Let's install passport.js

```bash
~/Projects/vue-spa-oauth $ npm i passport --save
```

Now since we are keeping things as modular, and single purpose as possible, let's create an `auth` folder and index.

```bash
~/Projects/vue-spa-oauth $ mkdir routes/auth && touch routes/auth/index.js routes/auth/twitter.js
```

First, in `routes/index.js`
```js
module.exports = (express) => {
  const router = express.Router()
  const jwt = require('jsonwebtoken')

  router.use('/auth', require('./auth')(express)) // include auth routes.
  
  router.get('/', (req, res, next) => {
    console.log('route hit')
    return res.json({msg: 'Welcome to the api'})
  })
  return router
}
```

Then, in `routes/auth/index.js`
```js
const passport = require('passport')
const User = require('../../models/user')
module.exports = (express) => {
  const router = express.Router()
  router.use(passport.initialize())
  router.use(passport.session())
  router.use('/twitter', require('./twitter')(express))
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
})
  return router
}
```

# Twitter
We need to grab `twitter` support from passport.js

```bash
~/Projects/vue-spa-oauth $ npm install passport-twitter --save
```

In `routes/auth/twitter.js`
```js
module.exports = (express) => {
  const router = express.Router()
  const passport = require('passport')
  const TwitterStrategy = require('passport-twitter').Strategy
  const config = require('../../config').twitter
  const User = require('../../models/user')
  
  passport.use(new TwitterStrategy({
    consumerKey: config.TWITTER_CONSUMER_KEY,
    consumerSecret: config.TWITTER_CONSUMER_SECRET,
    callbackURL: "https://a975ecb4.ngrok.io/api/auth/twitter/callback"
  }, (token, tokenSecret, profile, done) => {
    User.findOrCreate({
      'twitter.id': profile.id
    }, (err, user) => {
        if (err) { return done(err) }
        console.log('user:', user)
        done(null, user)
      })
    }
  ))
  // Redirect the user to Twitter for authentication.  When complete, Twitter
  // will redirect the user back to the application at
  //   api/auth/twitter/callback
  router.get('/', passport.authenticate('twitter'))

  // Twitter will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  router.get('/callback',
    passport.authenticate('twitter', { successRedirect: '/success',
                                      failureRedirect: '/login' }))
  return router
}
```

Awesome, in theory, this gives us a good start towards twitter. 
*note you need to add the twitter fields to your `config.js`*

# Twitter UI - basic
Again, we are going for dead simple at this point, we just want twitter to talk to us. 

Make `public/index.html`
```html
<a href='/api/auth/twitter'>Twitter auth</a>
```
We'll get to making `vue` use this later, but right now we just want to test our own server code.

Open up the browser link... and...
```
Error: OAuth authentication requires session support. Did you forget to use express-session middleware?
   at SessionStore.set (/home/nathan/Projects/vue-spa-oauth/node_modules/passport-oauth1/lib/requesttoken/session.js:20:33)
   at /home/nathan/Projects/vue-spa-oauth/node_modules/passport-oauth1/lib/strategy.js:273:35
   at /home/nathan/Projects/vue-spa-oauth/node_modules/oauth/lib/oauth.js:551:7
   at passBackControl (/home/nathan/Projects/vue-spa-oauth/node_modules/oauth/lib/oauth.js:390:11)
   at IncomingMessage.<anonymous> (/home/nathan/Projects/vue-spa-oauth/node_modules/oauth/lib/oauth.js:409:9)
   at emitNone (events.js:91:20)
   at IncomingMessage.emit (events.js:185:7)
   at endReadableNT (_stream_readable.js:926:12)
   at _combinedTickCallback (internal/process/next_tick.js:74:11)
   at process._tickCallback (internal/process/next_tick.js:98:9)
```

Oops.

Well that's frustrating. Let's load up a few more `npm` modules...

```bash
~/Projects/vue-spa-oauth $ npm i --save connect-mongo express-session cookie-parser
```

And update our `server.js` to use the new modules..

```js
// =======================
// get the packages we need ============
// =======================
const express     = require('express')
const app         = express()
const bodyParser  = require('body-parser')
const morgan      = require('morgan')
const mongoose    = require('mongoose')
const session     = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore  = require('connect-mongo')(session)
const routes      = require('./routes/')
const jwt    = require('jsonwebtoken') // used to create, sign, and verify tokens
const config = require('./config') // get our config file
const User   = require('./models/user') // get our mongoose model
const passport = require('passport')
// =======================
// configuration =========
// =======================
const port = process.env.PORT || 8000 // used to create, sign, and verify tokens
const server = require('http').Server(app)
mongoose.Promise = global.Promise
mongoose.connect(config.database) // connect to database
app.set('superSecret', config.secret) // secret variable

app.use(express.static('public'))

// use body parser so we can get info from POST and/or URL parameters
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection
})

app.use(session({
  store: sessionStore,
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
// app.use(passport.initialize())
// app.use(passport.session())
// use morgan to log requests to the console
app.use(morgan('dev'))
// =======================
// start the server ======
// =======================
app.get('/', (req, res) => {
    return res.send('Hello! The API is at http://localhost:' + port + '/api')
})

app.use('/api', routes(express))

server.listen(port)
console.log('Magic happens at http://localhost:' + port)
```

Now when I try from a browser:
```
Cannot GET /success
```

Awesome! While we are technically getting an error, it is one that means our authentication worked!

# vue.js
To get this going, we need everything that vue wants.

```bash
~/Projects/vue-spa-oauth/ui $ npm i
```

After this, we can run
```bash
~/Projects/vue-spa-oauth/ui $ npm run dev
```

And get a nice little console prompt, along with a default render from vue.

Normally, the first thing I'd do is delete these sample components, but right now. I want to use them.

I will get rid of a bit of the boiler-text though

In `ui/src/components/Hello.vue`
```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Login</h2>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
```

This needs a function now to get what we want to happen.

Modifying the existing `script` tag...

```js
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    oauthpopup () {
      let windowName = 'ConnectWithOAuth' // should not include space for IE
      let windowOptions = 'location=0,status=0,width=800,height=400'
      // let reloadLocation = () => { window.location.reload() }
      // log(options.path)
      this.oauthWindow = window.open('/api/auth/twitter', windowName, windowOptions)
      this.oauthInterval = window.setInterval(() => {
        if (this.oauthWindow.closed) {
          window.clearInterval(this.oauthInterval)
          console.log('window closed, we could do something else here if we wanted to..')
          // reloadLocation()
        }
      }, 1000)
    }
  }
}
```

Then just a slight tweak to the template:
```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Login</h2>
    <button @click="oauthpopup">Login with Twitter</button>
  </div>
</template>
```

And we have our login button!

At this point, we have proven successful, at least for me, this generates a popup window that loads up
to `/success` after finishing the `auth` process. When the window is closed, our terminal logs the message in the original window.

All that would be left to do, is set a token in local storage, and read it in on the window close. 

I'll expand on this concept in part two of this article. *Stay tuned*