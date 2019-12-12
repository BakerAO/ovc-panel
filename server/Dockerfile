FROM node:lts

WORKDIR /server
COPY . /server

RUN npm install

EXPOSE 3001

CMD ["sh", "-c", "npm start"]
