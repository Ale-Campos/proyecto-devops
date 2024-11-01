#
# 🧑‍💻 Development
#
FROM node:18-alpine as dev

RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV dev
ENV PORT=${PORT}
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV DB_ENGINE=${DB_ENGINE}
ENV DB_LOGGING=${DB_LOGGING}
ENV DB_SYNC=${DB_SYNC}
ENV NEW_RELIC_NO_CONFIG_FILE=true
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true
ENV NEW_RELIC_LOG=stdout
ENV NEW_RELIC_APP_NAME=proyecto-devops

COPY --chown=node:node . .

RUN yarn --frozen-lockfile

USER node

RUN yarn global add typescript

EXPOSE ${PORT}

CMD ["yarn", "start:dev"]


#
# 🏡 Production Build
#
FROM node:18-alpine as build

WORKDIR /app
RUN apk add --no-cache libc6-compat

ENV NODE_ENV production
ENV PORT=${PORT}
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV DB_ENGINE=${DB_ENGINE}
ENV DB_LOGGING=${DB_LOGGING}
ENV DB_SYNC=${DB_SYNC}
ENV NEW_RELIC_NO_CONFIG_FILE=true
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true
ENV NEW_RELIC_LOG=stdout
ENV NEW_RELIC_APP_NAME=proyecto-devops


COPY --chown=node:node --from=dev /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn build

RUN yarn --frozen-lockfile --production && yarn cache clean

USER node


#
# 🚀 Production Server
#
FROM node:18-alpine as prod

WORKDIR /app
RUN apk add --no-cache libc6-compat

ENV NODE_ENV production
ENV PORT=${PORT}
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV DB_ENGINE=${DB_ENGINE}
ENV DB_LOGGING=${DB_LOGGING}
ENV DB_SYNC=${DB_SYNC}
ENV NEW_RELIC_NO_CONFIG_FILE=true
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true
ENV NEW_RELIC_LOG=stdout
ENV NEW_RELIC_APP_NAME=proyecto-devops

COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/node_modules node_modules

USER node

CMD ["node", "dist/index.js"]
