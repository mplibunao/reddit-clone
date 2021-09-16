FROM node:14.16.1-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn --pure-lockfile --verbose

# ADD also allows urls and expands tar files
# Prefer COPY unless you need thoso 2
# ADD . /app
COPY . .

RUN yarn build

# ARG ON TOP CAUSES CACHE MISSES FOR LINES USING ARG AND RUNS
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

EXPOSE 4000 
CMD ["node", "dist/index.js"]

# by default uses root user which is bad for security
# node image provides node user
USER node
