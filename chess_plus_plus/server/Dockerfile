FROM node:16.17-alpine

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "server.js"] 

