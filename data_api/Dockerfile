FROM node:latest

WORKDIR /data_api

COPY package.json yarn.lock /data_api/

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4000

CMD [ "yarn", "start" ]