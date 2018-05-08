FROM node:7.10.0-alpine

# create app directory in container
RUN mkdir -p /app

# set /app directory as default working directory
WORKDIR /app

ADD package.json yarn.lock /app/

# --pure-lockfile: Don’t generate a yarn.lock lockfile
RUN yarn --pure-lockfile
RUN yarn global add pm2

# copy all file from current dir to /app in container
COPY ./server /app/

# expose port 8000
EXPOSE 8000

# cmd to start service
CMD ["pm2", "start", "processes.json", "--no-daemon"]
