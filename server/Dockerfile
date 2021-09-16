FROM node:14.16.1-alpine

WORKDIR /app

# COPY is done by default with root
# since we're using node user, it will not have enough permissions
# so we chown the files being copied as node:node
COPY --chown=node:node ./server/package.json ./server/yarn.lock ./
# For versions older than v17.09.0-ce COPY does not include the chown flag
# Just add RUN chown -r node:node /usr/src/app (might slow build times)
# or just tell your teammate to update their docker version :)

RUN yarn --pure-lockfile --verbose

# ADD also allows urls and expands tar files
# Prefer COPY unless you need thoso 2
# ADD . /app
COPY --chown=node:node ./server .
COPY --chown=node:node .env .env.example ./

RUN yarn build
# not sure but I think tsc needs to generate dist as root
# issue is I want to run rimraf atleast once when starting in dev mode
# but that fails because node doesn't have enough permissions for root
# folders (dist)
RUN chown -R node.node /app/dist

# ARG ON TOP CAUSES CACHE MISSES FOR LINES USING ARG AND RUNS
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

EXPOSE 4000 
CMD ["node", "dist/index.js"]

# by default uses root user which is bad for security
# node image provides node user
USER node
