FROM node:16-alpine

WORKDIR /app/client

COPY package.json  .

RUN yarn

COPY . .

RUN yarn add tsc && yarn build

EXPOSE 3000

CMD ["yarn", "dev"]
