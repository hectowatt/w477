FROM node:18.17.1

WORKDIR /app
COPY ./package*.json ./

RUN npm install

RUN npm install --save-dev eslint-config-prettier

COPY . .

