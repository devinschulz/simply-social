# Simply Social 
This is a practice project using Angular.

## Set Up 
To get this project working locally, clone this repo and run `./setup.sh` from your terminal. This will check for dependencies and install all packages required to run the project. Once all dependencies are met, gulp will start a local server at `localhost:8000`.

## Development 
To run the development environment, simply run  `gulp` from the project root directory and navigate to `localhost:8000`. 

## Production 
To compile, minify, and lint the project, run `gulp --env=prod` from the project root directory and navigate to `localhost:8000`.

Creating the public deploy files are easy, simply run `gulp build:public --env=prod` and it will create a public directory with all the required files