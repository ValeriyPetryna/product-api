#!/bin/bash
set -e

SERVER="postgres";
API="api";

source .env

# wait for pg to start
echo "Sleep wait for pg-server [$SERVER] to start";
SLEEP 1;

# create the db 
echo "CREATE DATABASE $POSTGRESQL_DATABASE ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres

# run migrations and seeds
docker exec -it $API bash -c "npx sequelize-cli db:migrate ; npx sequelize-cli db:seed:all"