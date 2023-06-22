FROM ghcr.io/puppeteer/puppeteer:20.7.3

WORKDIR /app

COPY package.json .

RUN npm install