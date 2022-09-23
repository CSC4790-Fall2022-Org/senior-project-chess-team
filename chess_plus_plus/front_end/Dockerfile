FROM node:16.17-alpine

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000
ENV PROXY_URL="http://server:5001/"
EXPOSE ${PORT}

CMD ["npm", "start"] 

