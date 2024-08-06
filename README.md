# fit3162-backend
Express.js backend for the FIT3162 Computer Science Project

## Initial Setup
* Ensure you have installed MySQL Community Server and have completed the setup instructions
    * When performing setup, create a user and record the username and password.
* Run `npm i`
* Copy the contents of `.env.template` into a new file called `.env` and fill in the host, username and password fields
* Run `node .`
* You should get a warning saying that the database has not been setup, but the database has been created.
* Navigate to `src/bootstrap` and copy the command given in `command_to_run.txt`. Run that in Command Prompt or BASH.
    * If `mysql` is not found, add the executable to your PATH first.
* Rerun `node .`