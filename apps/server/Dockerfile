FROM node:16-alpine

WORKDIR /app/server

COPY package.json  .

RUN yarn

COPY . .

RUN yarn add ts-node-dev

# RUN yarn migrate

EXPOSE 8080

# CMD ["yarn", "dev"]
