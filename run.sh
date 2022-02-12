#!/bin/bash
#CYAN="\033[36m"
#NO_COLOR="\033[0m"
#SPACING="-20s"

# GENERIC COMMANDS

function run { ## Runs [SERVICE] for one-off commands; Does not use ports specified in the service config preventing port collisions;
  echo "docker-compose run --rm $@"
  docker-compose run --rm "$@"
  exit_code=$?
  echo "docker-compose down"
  docker-compose down
  exit $exit_code
}

function up { ## Builds infrastructure
  echo "docker-compose up"
  docker-compose up
  exit_code=$?
  echo "docker-compose down"
  docker-compose down
  exit $exit_code
}

function run:service { ## Runs [SERVICE] with ports specificed in configuration. Use this for starting standalone services.
  echo "Starting service"
  docker-compose run --rm --service-ports "$@"
}

function secret { ## Generates a random secret that can be used for your SECRET_KEY and more
  docker-compose run --rm --no-deps server node -e "console.log(crypto.randomBytes(64).toString('hex'));"
}

function exec { ## Uses docker exec to execute a command agains a running container
  echo "docker-compose exec $@"
  docker-compose exec ${@}
}

function rebuild { ## Rebuilds and starts infrastructure
  echo "docker-compose up --build"
  docker-compose up --build
  exit_code=$?
  echo "docker-compose down"
  docker-compose down
  exit $exit_code
}

function destroy { ## Destroy infrastructure including volumes
  if [ $# -ne 1 ]; then
    read -p "Are you sure you want to destroy the volumes as well? (Y/n)" answer
  elif [ "$1" = "-n" ]; then
    answer="n"
  elif [ "$1" = "-y" ]; then
    answer="y"
  else
    answer="y"
  fi

  if [ $answer = "y" ]; then
    echo "Destroying infrastructure"
    docker-compose down -v
  fi
}

function ls { ## List services
  echo "Listing services"
  docker-compose ls ${@}
}

function list_env { ## List env args in specific [SERVICE]
  if [ $# -ne 2 ]; then echo 1>&2 "Usage: $0 $FUNCNAME [run | exec] [SERVICE]";exit 3;fi

  if [ $1 = "run" ]; then
    echo "docker-compose run --rm $2 sh -c 'set'"
    docker-compose run --rm $2 sh -c 'set'
  fi

  if [ $1 = "exec" ]; then
    echo "docker-compose exec $2 sh -c 'set'"
    docker-compose exec $2 sh -c 'set'
  fi
}

function logs { ## Display logs for specific [service] or infrastructure
  docker-compose logs $1
}

function sh { ## Launch a shell in specified [SERVICE]
  if [ $# -ne 2 ]; then echo 1>&2 "Usage: $0 $FUNCNAME [run | exec] [SERVICE]";exit 3;fi

  if [ $1 = "run" ]; then
    echo "Launching shell in service $1"
    docker-compose run --rm $1 sh
  fi

  if [ $1 = "exec" ]; then
    echo "Launching shell in service $1"
    docker-compose exec $1 sh
  fi
}

function help {
  printf "Commands:\n"

  grep -E '^[a-zA-Z_-].*? { .*?## .*$$' $0 | sed -e 's#\\:#:#g' -e 's/function //' | awk 'BEGIN {FS = " { .*?## "}; {printf "\033[36m %-20s \033[0m %s\n", $1, $2}'

  printf "\nExtended help:\n  Each task has comments for general usage\n"
}



# This idea is heavily inspired by: https://github.com/adriancooney/Taskfile
TIMEFORMAT=$'\nTask completed in %3lR'
time "${@:-help}"
