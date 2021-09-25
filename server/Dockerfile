FROM node:14.16.1-alpine
#ENV NODE_ENV $NODE_ENV

WORKDIR /usr/src/app

# COPY is done by default with root
# since we're using node user, it will not have enough permissions
# so we chown the files being copied as node:node
COPY --chown=node:node ./server/package.json ./server/yarn.lock ./
# For versions older than v17.09.0-ce COPY does not include the chown flag
# Just add RUN chown -r node:node /usr/src/app (might slow build times)
# or just tell your teammate to update their docker version :)

RUN yarn --pure-lockfile

# ADD also allows urls and expands tar files
# Prefer COPY unless you need thoso 2
# ADD . /app
COPY --chown=node:node ./server .


# Put env files on ../ since app is bind mounted
# thus will be overwritten by file in host (no .env file)
#WORKDIR /usr/src
# moving to top one directory above doesn't work since dokku looks for .env
# inside /app
# might just remove this dotenvsafe from my setup
#COPY --chown=node:node .env.example ./

#WORKDIR /usr/src/app

#COPY --chown=node:node .env.production ./.env
RUN yarn build
# not sure but I think tsc needs to generate dist as root
# issue is I want to run rimraf atleast once when starting in dev mode
# but that fails because node doesn't have enough permissions for root
# folders (dist)
RUN chown -R node:node /usr/src/app/dist
#RUN chmod +x ./entrypoint

# ARG ON TOP CAUSES CACHE MISSES FOR RUNS AFTER ARG CAUSE IT IMPLICITLY USES THE
# ARGS
#ARG NODE_ENV
ENV NODE_ENV production

# dokku doesn't run as pid 1 anyway
#RUN apk add --no-cache tini
# Tini is now available at /sbin/tini
#ENTRYPOINT ["/sbin/tini", "--"]

EXPOSE 80 
#ENTRYPOINT ["sh", "./entrypoint"]
CMD ["node", "dist/index.js"]

# by default uses root user which is bad for security
# node image provides node user
USER node
