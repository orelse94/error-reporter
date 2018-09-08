FROM node:8

COPY . /

RUN npm install

EXPOSE 3001

WORKDIR . 

ENTRYPOINT ["npm", "start"]
