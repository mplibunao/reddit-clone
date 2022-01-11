# syntax=docker/dockerfile:1
# common base image for development and production
FROM node:14.16.1-alpine AS base
WORKDIR /app
RUN mkdir -p node_modules && chown -R node:node .
COPY --chown=node:node package.json yarn.lock ./
EXPOSE 4000


# Builds dist / can be used for development
FROM base AS development
USER node
#RUN yarn --pure-lockfile
RUN yarn --frozen-lockfile
COPY --chown=node:node . .
# Check if you can remove the chown below as we change the user earlier
RUN yarn build
#RUN yarn build && \
  #chown -R node:node /app/dist
CMD ["node", "dist/src/index.js"]


FROM base AS production
USER node
ENV NODE_ENV=production
RUN yarn --frozen-lockfile --production
#RUN yarn --pure-lockfile --production
COPY --from=development --chown=node:node /app/dist ./dist
CMD ["node", "dist/src/index.js"]
