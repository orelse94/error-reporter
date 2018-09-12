FROM node:8

COPY . /

RUN npm install

WORKDIR . 

ENTRYPOINT ["npm", "start"]
