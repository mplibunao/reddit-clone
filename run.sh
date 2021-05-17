#!/bin/bash
# Usage: run.sh SERVICE [CMD...]

function run {
  # run container using docker run then docker-compose down upon exiting
  echo "docker-compose run --rm --service-ports $@"
  docker-compose run --rm --service-ports "$@"
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
