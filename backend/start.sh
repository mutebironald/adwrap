#!/bin/sh
set -e  # exit on any error

echo "Running seed.js"
node seed.js

echo "Running migrations"
npx db-migrate up --env docker

echo "Running seeders"
npx db-migrate seed:run --env docker

echo "Starting server"
exec node server.js
