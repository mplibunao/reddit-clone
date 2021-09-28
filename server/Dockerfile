# syntax=docker/dockerfile:1
# common base image for development and production
FROM node:14.16.1-alpine AS base
WORKDIR /app
COPY --chown=node:node package.json yarn.lock ./


# Builds dist / can be used for development
FROM base AS development
RUN yarn --pure-lockfile
COPY --chown=node:node . .
RUN yarn build
RUN chown -R node:node /app/dist
EXPOSE 4000
USER node
CMD ["node", "dist/src/index.js"]


FROM base AS production
ENV NODE_ENV=production
RUN yarn --pure-lockfile --production
COPY --from=development --chown=node:node /app/dist ./dist
EXPOSE 80 
CMD ["node", "dist/src/index.js"]
USER node
