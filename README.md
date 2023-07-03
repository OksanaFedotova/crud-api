# crud-api

# Installing:
## Type these commands in the command line
git clone -b develop https://github.com/OksanaFedotova/crud-api.git
npm cd crud-api
npm i

## Running:
Development: npm run start:dev
Production: npm run start:prod
Cluster mode: npm run start:multi
Test: npm test

## Using (endpoints):
GET api/users - to get all persons
GET api/users/${userId} - to get user by id
POST api/users - to create record about new user and store it in database
PUT api/users/${userId} - to update existing user
DELETE api/users/${userId} - to delete existing user from database
Valid JSON example:
{
  "username": string,
  "age": number,
  "hobbies": []
}
