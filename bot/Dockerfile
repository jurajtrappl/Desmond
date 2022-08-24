FROM node:latest

WORKDIR /bot

COPY package.json yarn.lock /bot/

RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn", "start"]