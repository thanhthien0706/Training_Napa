FROM node:latest

RUN mkdir -p /node/server
WORKDIR /node/server

COPY package.json /node/server

RUN npm install

COPY . .

CMD node ./bin/www