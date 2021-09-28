## Prerequisites

- docker
- docker-compose

## Setup

- Create an `.env` file

```bash
cp .env.example .env
```

- Create `docker-compose.override.yml` to pass dev related
  `docker-compose.yml`

```bash
cp docker-compose.override.yml.example docker-compose.override.yml
```

This application runs completely on `docker` for development. However it
needs you need to run the docker commands on the root directory of the
project because the bind mounts uses `${PWD}` to determine the host path


You can use `run.sh` and `Makefile` as an alias/helper for running the various
commands


Run `make` to see all possible `makefile targets`. 


Run `./run.sh` to see all available functions.


Some important commands are as follows

| Commands | Description |
|----|----|
| `make up`   | start all containers using docker-compose up |


## Workflows

- on push all branches except master/develop - run ci
- on push develop - run ci && deploy to staging
- on release - run ci && deploy prod
