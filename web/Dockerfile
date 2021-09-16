FROM node:14.16.1-alpine

EXPOSE 3000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir -p /app/node_modules
WORKDIR /app
COPY package.json .
COPY yarn.lock .
#ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile
ADD . /app

CMD ["yarn", "dev"]

