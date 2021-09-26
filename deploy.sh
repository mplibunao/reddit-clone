#!/bin/bash

echo What should the version be?
read VERSION

DOCKER_BUILDKIT=1 docker build -t mplibunao/lireddit:$VERSION -f ./server/Dockerfile .
docker push mplibunao/lireddit:$VERSION
TERM='xterm-256color' ssh lireddit "docker pull mplibunao/lireddit:$VERSION && \
  docker tag mplibunao/lireddit:$VERSION dokku/api:$VERSION && dokku tags:deploy api $VERSION"
