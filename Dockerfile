FROM node:12.14.0-alpine3.11

RUN apk add --no-cache bash

RUN touch /root/.bashrc | echo "PS1='\w\$ '" >> /root/.bashrc

RUN npm install -g @loopback/cli

RUN mkdir -p /home/node/app

WORKDIR /home/node/app
