FROM node:16
RUN mkdir /home/node/app/node_modules && chow -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9000
CMD nodemon -L --watch . server.js