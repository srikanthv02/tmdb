# tmdb
Movie Listing - DBApp using TMDB API.

### Overview ### 
- This project is built on AngularJS(1.4) in the client side and NodeJS for running the server.
- Version of NodeJS is v8.12.0.
- Version of NPM is 6.4.1
- Editor used for building this project is Sublime Text.
- .gitignore file is available.
- The API reference has been take from TMDB API documentation.
- The custom javascript files are concatenated.
- Sass is used for CSS pre-processing which gets converted to css and then gets minified using Grunt.
- API's are called only once at the loading of the page. Wanted to implement caching, but wasn't sure about the update of API time interval.

### Steps to Build - Using Script ###
- There is a shell script file called as build.sh, which installs node and npm for MAC machines, along with Git Clone and npm install on the path. Only pre-requisite is HomeBrew. Run the file as 'sh build.sh'. 
- If node is already installed, it will skip the step and move ahead.

### Steps to Build - Manual ###
- Install node and npm on MAC using brew install node. (In case HomeBrew is working)
- In case of Ubuntu machines, install node and npm via 
  - sudo apt-get update
  - sudo apt-get install nodejs
  - sudo apt-get install npm
- git clone https://github.com/srikanthv02/tmdb
- cd tmdb/client
- run 'yarn'
- run 'sudo npm install grunt --save-dev'
- run 'sudo gem install sass'
- run 'sudo grunt build-dev' (This is for running client side build for dev. Similarly the same can be run for prod as well)
- cd ../server
- run sudo npm install
- run sudo npm start
- Access the app by 'localhost:3001' on the browser and the user will be navigated to the tmdb app page.

## ToDo - Future Work ###
- Work on Test Cases.
