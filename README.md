## Prerequisites

- docker
- docker-compose

## Setup

Run `make` to see all possible commands. Some important ones are as follows

| Commands | Description |
|----|----|
| `make up`   | start all containers using docker-compose up |


## Notes

- Custom Dockerfile for postgres is not needed for now since we don't need to run a custom script when building the container

## Workflows

- on push all branches except master/develop - run ci
- on push develop - run ci && deploy to staging
- on release - run ci && deploy prod
