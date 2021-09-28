#!/bin/bash
# Usage: run.sh SERVICE [CMD...]

function run-service-ports {
  # run container using docker run then docker-compose down upon exiting
  # Runs on specified ports
  echo "docker-compose run --rm --service-ports $@"
  docker-compose run --rm --service-ports "$@"
  exit_code=$?
  echo "docker-compose down"
  docker-compose down
  exit $exit_code
}

function run {
  # run container using docker run then docker-compose down upon exiting
  # does not use ports specified in the service config preventing port
  # collisions
  echo "docker-compose run --rm $@"
  docker-compose run --rm "$@"
  exit_code=$?
  echo "docker-compose down"
  docker-compose down
  exit $exit_code
}

function up {
  # run docker-compose up then docker-compose down upon exiting
  echo "docker-compose up"
  docker-compose up
  exit_code=$?
  echo "docker-compose down"
  docker-compose down
  exit $exit_code
}

function secret {
  # Generate a random secret that can be used for your SECRET_KEY and more
  docker-compose run --rm --no-deps server node -e "console.log(crypto.randomBytes(64).toString('hex'));"
}

function cmd {
  # run docker exec
  echo "docker-compose exec $@"
  docker-compose exec ${@}
}


function help {
  printf "%s <task> [args]\n\nTasks:\n" "${0}"

  compgen -A function | grep -v "^_" | cat -n

  printf "\nExtended help:\n  Each task has comments for general usage\n"
}

# This idea is heavily inspired by: https://github.com/adriancooney/Taskfile
TIMEFORMAT=$'\nTask completed in %3lR'
time "${@:-help}"
