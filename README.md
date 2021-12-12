# WHUFC-news

This Web App aims to provide users with all the news about English football club West Ham United in four English newspapers and these newspapers are: The Guardian, The Sun, Mirror and Daily Star.

In this Web App, when the user is not authenticated he does not have access to the links, but when the user is authenticated he has access to the links.

# Intallation

Download ZIP (Code -> Download ZIP).

Install dependencies by doing the npm install command in the Visual Studio Code terminal. Command name: npm install

Run the project using the node server.js command in Visual Studio Code terminal. Command name: node server.js

When the registration is done, stop the server.
Then make the following change in the users.db file: change from "confirm": 0 to "confirm": 1.
Then do the node server.js command in the VSC terminal to start the server again and login.

Navigate to http://localhost:3010
