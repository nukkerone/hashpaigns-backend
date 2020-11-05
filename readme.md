# HashPaigns Backend
Backend by Firebase

## Environment Variables
Using https://medium.com/firelayer/deploying-environment-variables-with-firebase-cloud-functions-680779413484 as guide

In order to reset the env variables based on env.json file:

`firebase functions:config:unset env && firebase functions:config:set env="$(cat env.json)"`

The above command needs to be run any time a new env variable is added, removed or updated.