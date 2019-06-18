FROM node:carbon
WORKDIR /usr/dist/src

COPY package*.json ./
RUN npm install --production
COPY . .

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]