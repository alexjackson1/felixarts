FROM node:17.6 as build

# Application source code directory
WORKDIR /usr/src/app

# Copy manifest and lock files to install and cache dependencies
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install

# Copy remainder of the build context and compile (typescript source files)
COPY [".", "./"]
RUN yarn build

# Serve static contents on nginx image
FROM nginx:1.21.6-alpine
COPY ["config/default.conf", "/etc/nginx/conf.d/default.conf"]
COPY --from=build ["/usr/src/app/dist", "/usr/share/nginx/html"]
