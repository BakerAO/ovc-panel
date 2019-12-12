FROM node:lts

WORKDIR /ui
COPY . /ui

RUN npm i

EXPOSE 80

CMD ["sh", "-c", "PORT=80 npm start"]
