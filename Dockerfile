#
# 🧑‍💻 Development
#
FROM node:18-alpine as dev

RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV dev
ENV DB_LOGGING=true

COPY --chown=node:node . .

# Instalar dependencias, incluyendo las de desarrollo
RUN npm install --legacy-peer-deps

# Instalar los paquetes de tipos necesarios
RUN npm install --save-dev @types/express @types/supertest @types/jest

USER node

# Instalar TypeScript localmente
RUN npx tsc --version

EXPOSE 3000

CMD ["npm", "run", "dev"]


#
# 🏡 Production Build
#
FROM node:18-alpine as build

WORKDIR /app
RUN apk add --no-cache libc6-compat

ENV NODE_ENV production

COPY --chown=node:node --from=dev /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build

RUN npm install --legacy-peer-deps --production && npm cache clean --force

USER node


#
# 🚀 Production Server
#
FROM node:18-alpine as prod

WORKDIR /app
RUN apk add --no-cache libc6-compat

COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/node_modules node_modules

USER node

CMD ["node", "dist/index.js"]
