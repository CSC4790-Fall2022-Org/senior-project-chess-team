# Required Software
- Docker (with compose) <--- easiest way
<br />(below dependencies are required if not running with docker) <br />
- Node v. 16.17
- npm (any version should be fine)

NOTE: If you receieve an error about the Docker daemon not being started, make sure Docker desktop is open and running.

# Running the application
1. In your terminal, navigate to the chess_plus_plus directory
2. From that directory, run docker compose build. This will build the images.
3. From that directory, run docker compose up. Will run the images that were just built.

# To run without Docker
1. In your first terminal, navigate to chess_plus_plus/front_end
2. Run npm install
3. Run npm start
4. Open a second terminal, and navigate to chess_plus_plus/server
5. Run npm install
6. Run node server.js

# Viewing application  
Navigate to localhost:3000/ with your browser of choice.

If you would like to play a game against yourself, you will need one regular tab and one incognito tab.
Simply sign into different accounts on the different tabs.
We have provided two testing accounts for login purposes. <br />
Username: defaultuser1
Password: Password1!

Username: defaultuser2
Password: Password1!
