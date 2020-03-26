FROM node:erbium

WORKDIR /app

COPY package.json ./

RUN mkdir /app/node_modules

RUN npm install -f

COPY ./ ./

EXPOSE 7000

RUN  npm run tsc

CMD ["npm", "run", "start"]