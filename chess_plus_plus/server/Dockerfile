FROM node:16.17-alpine

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5001
EXPOSE ${PORT}

CMD ["node", "server.js"] 

