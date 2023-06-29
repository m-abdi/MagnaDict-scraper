FROM node:18-alpine AS base
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn run build
CMD [ "node", "./build/index.js" ]