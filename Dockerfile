FROM node:18-alpine AS base
WORKDIR /app
COPY package.json .
RUN npm install


FROM base AS builder
WORKDIR /app
COPY . .
RUN npm run build


FROM base
WORKDIR /app
COPY --from=builder /app/build .
CMD [ "node", 'build/index.js' ]