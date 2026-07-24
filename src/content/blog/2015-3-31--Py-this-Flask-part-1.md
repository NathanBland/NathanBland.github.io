---
slug: 2015-3-31--Py-this-Flask-part-1
title: Py This! Experimenting with Flask - Part 1
description: An early experiment building a small blogging system with Python and Flask.
pubDate: 2015-03-31
tags: [python, flask]
---

A while back I started a project called Caster. The main goal of this project was to build out a simple blogging system with the Python framework called [Flask](https://flask.palletsprojects.com/). However, I found myself distracted with other projects and Caster faded into the background. Today I decided to revisit that idea, but with a few more stipulations than last time.

*This is part of what will probably end up being a three-part series.*

In terms of features I knew I wanted Markdown support for creating posts, and I also knew I would want tags and categories for each post. I'm not currently planning to allow multiple users for this, as it will be more of a static site than a WordPress clone.

## The Setup

The system I'm using to develop this on is running [Arch Linux](https://www.archlinux.org/), which is great, but also doesn't come with pip installed. To get that going, I just needed pacman.

```bash
$ sudo pacman -S python-pip
```

Now to install virtualenv:

```bash
$ sudo pip install virtualenv
```

I already have a [GitHub repository set up for Caster](https://github.com/NathanBland/Caster), so a simple `$ git clone` got my directory set up. Now I just need a virtualenv, and to activate it.

```bash
$ virtualenv venv
$ . venv/bin/activate
```

Awesome, time to get Flask going next:

```bash
$ pip install Flask
```

*As a small note*, I'm using [PyCharm Community](https://www.jetbrains.com/pycharm/download/) as an editor, so I had to add the virtual env to its settings, but that was pretty [straightforward](https://www.jetbrains.com/help/pycharm/creating-virtual-environment.html).

## Getting on with it

Now that setup is done, I can finally start working with Flask. I haven't decided if I want a database yet, so I haven't chosen to do that setup yet. From in PyCharm, in the root of the project folder, I make a new file called `server.py`.
Right now I'm just wanting to warm back up to Flask, so I'm going with their [getting started](https://flask.palletsprojects.com/en/stable/quickstart/) code, with the addition of `app.debug = True`.

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.debug = True
    app.run()
```

To be continued...
