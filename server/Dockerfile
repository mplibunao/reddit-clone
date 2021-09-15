FROM node:14.16.1-alpine



RUN mkdir -p /app/node_modules
WORKDIR /app
COPY package.json .
COPY yarn.lock .
#ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile --verbose
ADD . /app

CMD ["yarn", "start"]
# ARG ON TOP CAUSES CACHE MISSES FOR LINES USING ARG AND RUNS
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
EXPOSE 4000 
