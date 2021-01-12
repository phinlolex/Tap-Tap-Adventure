![WTF?! Adventure](https://github.com/design1online/WTF-Adventure/blob/main/assets/img/wtfadventure.png?raw=true "WTF?! Adventure")


![Node CI](https://github.com/design1online/WTF-Adventure/workflows/Node%20CI/badge.svg) ![Jest Code Coverage](https://raw.githubusercontent.com/design1online/WTF-Adventure/main/coverage/badge.svg) ![Esdoc Coverage](https://raw.githubusercontent.com/design1online/WTF-Adventure/main/docs/badge.svg?sanitize=true) ![WTFPL](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-4.png)

WTF?! Adventure is a massively multi-player online open-source project based on Little Workshop's 2012 demonstration for HTML5 WebSockets - [BrowserQuest (BQ)](https://github.com/browserquest/BrowserQuest) and a subsequent fork called [Tap Tap Adventure (TTA)](https://github.com/phinolex/Tap-Tap-Adventure).
WTF?! Adventure is completely open-source, allowing its community to collaborate and aid in the perfection of the game. Anyone is free to create their own derivative of WTF?! Adventure, with no strings attached.

### Features & Functionality

- **Webpack:** Dev and prod config files and now utilizes browserSync for easier client side development. A new build folder is created that contains minified versions of the client side resources.

- **NodeJS:** Server has been updated to use nodemon for easier restarting and server development

- **Babel ES6:** All files updated to take advantage of newer JS functionality and class format

- **Testing:** Updated to use eslinter using airBnB standards

- **Styles:** Converted to allow the use of SASS

- **Dependencies:** All dependencies are now pulling from npm packages in package.json

- **Rendering:** Has been completely redone to only draw frames whenever necessary. This in turns boosts the performance on browsers such as Safari & Firefox.

- **Networking & Packets:** Previously, everything regarding networking was crammed into a singular class, now it has all been laid out properly with every class pertaining necessary functions.

- **Client Rework:** The stress put on the client previously was unbelievable, the client not only had to receive packet data, it was responsible for parsing music, achievements, quests, item data, and many other nonsense. This has all been moved to the server side, the client received information about whatever it needs from the server, removing upwards of 20MB of unnecessary data.

- **Source Structure:** Since everything has been rewritten from scratch, the code itself is located in designated files following a logical structure, as opposed to random scattered code throughout the source. As an extra, the convention remains unanimous throughout the source, ensuring maximum readability is achieved all throughout.

- **Database Loading:** Now uses MySQL as opposed to Redis. This is because MySQL is far more reliable. With this, the source is able to generate its own database structure regardless of the chosen MySQL server. Everything is stored in its according type and retrieved upon logging in.

- **Data Parser:** Located in `server/js/util/` the parser loads all data regarding NPCs, Mobs, Items and so on right when the server starts. It is then able to use it throughout the source statically.

- **Map Loading:** The client-sided map has been brought down to the bare minimum, it is only responsible for its fair share of collisions (checked both client and server sided) and determining tiles and what gets drawn where. While the server-side map loading ensures the location of objects, NPCs, areas and so on. The client receives information depending on the actions taken by the player (i.e. a player walks into a new zone and must receive new music)

- **Combat System:** Completely rewritten and much more controlled, the combat system accounts for both single, multi, ranged or melee combat. It can easily be expanded to include special mobs (e.g. bosses). It is all done in the server-side, greatly reducing the chance of any exploit.

- **Controllers:** Both the client and the server side contain a folder named `controllers`. The name is pretty self explanatory, this controls important functions of the game.

- **Quest System:** The quest controller encompasses both achievements and quests, both have been created in a plugin format and allow for manipulation of server events. Achievements are far more simplistic in nature, consisting of minor tasks and small rewards.

- **Plugin System:** Expands upon the controllers and combat and allows direct control over individual items.

- **Crypto:** removed this functionality

- **Graphics:** entirely new UI graphics

- **Doors:** enhanced to make going in and out of doors easier with mouse click functionality


## Todo List

- Better tutorial
- Advertisements
- Private Messages
- Passive Companions
- Active Companions
- Add Guilds and Parties
- Implement trading amongst player
- Abilities
- Finalize all bosses
- More quests and achievements


## Running WTF?! Adventure

Running the server is fairly straightforward, for the most part. If you already have everything installed and configured you can skip directly to step 3.

##### Step 1 - Install the dependencies

In the command line run: `npm install`

##### Step 2 - Setting the config files

Convert the server configuration for local usage, go in both `src/server/config.json` and `src/client/config.json` and update the ports and settings to meet your needs.

##### Step 3 - Make sure MySQL is up and running

If you are running this project locally then you will need something like [XAMP](https://www.apachefriends.org/index.html) or [MAMP](https://www.mamp.info/en/) that you can turn on and use to run MySQL locally.

If you are running this project on a server then you will need to make sure you have a mysqld instance running.

Make sure you have the proper config for the MySQL server in your `src/server/config.json` file, often times connection issues with WTFServer will be due to connection or authentication errors when trying to connect to your MySQL database.


##### Step 4 - Run the NodeJS server

In the command line type: `npm run wtfserver`

##### Step 5 - Run the HTML5 Client Webpack

Open another terminal and then type: `npm start`

##### Step 6 - View in Browser

Now open your browser and navigate to `http://{ip}:{port}/` as defined in your configuration files. Typically this will be `http://localhost:3000` if you use the default webpack and client configuration settings provided.
