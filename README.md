we're back with yet another spotify application

1. This app contains a backend server and a frontend nextjs application that both must be installed. 
Backend Installation: 
1. ImageMagick Cli must be installed. This proper version must be version 6 and not 7. 
-- The legacy website can lead you to the correct version https://legacy.imagemagick.org/script/download.php
-- Note that if ImageMagick version 7 is installed in addition to 6, this will not work. 
2. Once ImageMagick is installed, the node_modules must be installed for the server. This can be done using "npm install" inside of the top level server folder.
3. Once everything is installed, the server can be started with "npm start" 

Frontend Installation: 
1. navigate to the src/client directory
2. run "npm install" to install all the needed dependencies. 
3. Once everything is installed the client can be started with "npm run dev" 
4. navigate to localhost:3000/ and it should redirect you to a login page. 
