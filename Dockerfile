FROM node:10.16.3

WORKDIR /app

COPY package.json ./

RUN mkdir /app/node_modules

RUN npm install --silent

COPY ./ ./

EXPOSE 7000

RUN  npm run tsc

CMD ["npm", "run", "start"]