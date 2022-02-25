FROM node:17.6

ENV NODE_ENV=production

WORKDIR /usr/src/server

COPY ["package.json", "package-lock.json*", "./"]

RUN yarn install --production

COPY . .

CMD ["node", "bin/www"]