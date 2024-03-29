# EXPRESS BACKEND

```
Express
Postgresql
Passport
Docker
```

# Beginners Friendly Node.js API

I made this server because most of the other Node API's are either too bloated.
Full of things you don't understand or will never use. Or are just plain
outdated.

## Development

| Copy test env files

```
cp .env.development.example .env.development
cp .env.test.example .env.test
```

| Set up DB

psql into database. Password should be blank or postgres.
`psql -U postgres`

```
CREATE USER fun WITH PASSWORD '123456';
CREATE DATABASE fun;
```

* Clone the repo
* Run `yarn`
* Run migrations `sequelize db:migrate`
* Start server `yarn start`

## Database Management

To create a new model run

```
sequelize generate:model --name Song --atributes title:string, language:string,
```

## Docker

Get into postgres shell
`docker exec -it songsbackend_postgres_1 psql -U postgres`

## Based on this tutorial

[Basic Node.js](https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize)
[Sequelize basics](http://docs.sequelizejs.com/manual/tutorial/migrations.html)
[Sequelize important](https://codeburst.io/sequelize-migrations-setting-up-associations-985d29b61ee7)

## Features

* Token based Authentication through passport
* Database management with Sequelize
* No callback hell. All promise/async based.

# In the future

* Graphql integration
* Shipit file for easy deployments
