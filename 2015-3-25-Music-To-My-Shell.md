I love music and the way it can put me in the mood to write or develop different things. I'm also currently in love with [Arch Linux](https://www.archlinux.org/), and just Linux in general. So naturally I started looking for CLI music players.

[Pianobar](http://6xq.net/projects/pianobar/) is a great little CLI tool that can be used to stream [Pandora](http://www.pandora.com/) through your shell, its great and I love everything that it does. 

# Setup 
Installing it is easy enough on arch:

`$ sudo pacman -S pianobar`

There is also a [Ubuntu PPA](https://launchpad.net/ubuntu/+source/pianobar) but I'm not going to cover using that in this article.

Running it after it has been installed is simple; `$ pianobar` will do the trick to get it up and running. You will then be presented with a list of stations, mine looks like this:

**Station List**
![Station List](/img/pianobar_stations.png)

The one issue with this is that it prompts you for user authentication every time you use it, which is something I figured should be automatic.

#Configuration#
A little reading on the [Arch Wiki](https://wiki.archlinux.org/index.php/Pianobar#Configuration) revealed that this is quite easy, and even shows a few other things I hadn't thought of. First things first, we need to make a configuration file, which is straight forward. 

According to the wiki we need to make our configuration file at `~/.config/pianobar/config` ok great, lets do that!
```bash
$ touch ~/.config/pianobar/config

touch: cannot touch ‘/home/nathan/.config/pianobar/config’: No such file or directory
```

Ok, fine, we'll go make the directory first.

```bash
$ mkdir ~/.config/pianobar
$ touch ~/.config/pianobar/config
```

Great! Now we have a configuration file to work with. Lets start out with getting some authentication going for us...

`$ nano ~/.config/pianobar/config`

```bash
password = <yourpassword>
user = <username>
```

Save and exit. Now lets try running pianobar again. `$ pianobar`

**Pianobar automatic login**
![pianobar](/img/pianobar_auth.png)

Fantastic, now it logs in auto-magically for us. Select a station and get some music going. I'm in the mood for some Electronica, so I'm going to select that station. 

```bash
[?] Select station: 13
|>  Station "Electronica Radio" (1485406034118058132)
(i) Receiving new playlist... Ok.
```

Now, what's with that funky number after our station name? That happens to be the station ID, and we can have even more fun in our configuration file with that number if we want to, we just add to our config..

`$ nano ~/.config/pianobar/config`
```bash
autostart_station = <stationid>

password = ...
user = ...
```

Easy enough, let's try it out.

```bash
$ pianobar
Welcome to pianobar (2014.09.28)! Press ? for a list of commands.
(i) Login... Ok.
(i) Get stations... Ok.
|>  Station "Electronica Radio" (1485406034118058132)
```

Great looks like everything is working how we want!

# Issues #
For me, when I first tried to use pianobar I had a problem with my audio driver being alsa. The [Arch wiki](https://wiki.archlinux.org/index.php/Pianobar#Troubleshooting) has more details on this, but for me the solution was to change my default driver to pulse. This was pretty painless:

`$ sudo nano /etc/libao.conf`
```bash
default_driver=pulse
```

I haven't noticed any issues across the system with this either, and pianobar works great now. This is the only issue I've had, but that doesn't mean there aren't others. If you have a question or a problem with any of the steps I laid out here, make an [issue](https://github.com/NathanBland/NathanBland.github.io/issues/new) on my site [issue tracker](https://github.com/NathanBland/NathanBland.github.io/issues).

Be sure to include the title **Music To My Shell** and the **question** label.

Thanks for reading, and enjoy the music.