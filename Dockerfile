FROM node:latest

WORKDIR /tmp
COPY data/package.json package.json
RUN npm install

RUN mkdir /app
WORKDIR /app
ADD . /app
WORKDIR /app/data
