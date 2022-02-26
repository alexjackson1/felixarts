FROM node:17.6 as build

# Server source code directory
WORKDIR /usr/src/server

# Copy manifest and lock files to install and cache dependencies
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install

# Copy remainder of the build context and compile (typescript source files)
COPY [".", "./"]
RUN yarn build


FROM node:17.6

# Set node environment variables (note: server loads .env files independently)
ENV NODE_ENV=production

# Live sever directory
WORKDIR /var/www

# Copy manifest and lock files first to install and cache dependencies
COPY --from=build ["/usr/src/server/package.json", "/usr/src/server/yarn.lock", "./"]
RUN yarn install --production

# Copy remainder of the build stage (javascript source files)
COPY --from=build ["/usr/src/server/build", "./build/"]
COPY --from=build ["/usr/src/server/public", "./public/"]

# Run server
CMD ["node", "build/main.js"]