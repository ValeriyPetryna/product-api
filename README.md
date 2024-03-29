<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description
NestJS + PostgreSQL + Docker

Required to have installed bash, Node/npm, Docker, and Docker Compose

## Preparing to Installation

```bash
$ Clone repository and Rename .env.example to .env
```

## Installation
```bash
$ npm install
```

Build docker images and run containers:
```bash
$ docker-compose up --build -d
```

Run database initialization script after docker containers were started:
```bash
$ npm run db:init
```
> or create database in container and run migrations and seeds manually:

```bash
$ docker exec -it api sh -c "npm i sequelize-cli ; npx sequelize-cli db:migrate ; npx sequelize-cli db:seed:all"
```

## Links:

### Running the app by default:
> All endpoints described in Swagger API Documentation:

[App link](https://localhost:3000)


## Test

```bash
$ npm run test
```
