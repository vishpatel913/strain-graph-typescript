FROM node:10.14.2-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

CMD [ "yarn", "start" ]
# EXPOSE 4000