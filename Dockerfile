FROM node:0.10.38

WORKDIR /tmp
COPY data/package.json package.json
RUN npm install

RUN mkdir /app
WORKDIR /app
ADD . /app
