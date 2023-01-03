#!/bin/bash
set -e

SERVER="postgres";
API="api";

source .env

# wait for pg to start
echo "Sleep wait for pg-server [$SERVER] to start";
SLEEP 1;

# connect to postgres container and try to create database if docker doesn't create it
echo "CREATE DATABASE $POSTGRESQL_DATABASE ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres

# run migrations and seeds in api container
docker exec -it $API bash -c "npm i sequelize-cli ; npx sequelize-cli db:migrate ; npx sequelize-cli db:seed:all"