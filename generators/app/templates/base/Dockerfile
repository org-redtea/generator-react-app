# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
FROM node:10.15.0-alpine

ARG PORT=80
#ARG REACT_APP_ENV

ENV PORT=$PORT
#ENV REACT_APP_ENV=$ARG REACT_APP_ENV

WORKDIR /home/node/app

COPY . .

RUN yarn global add serve@11.3.0 && yarn && yarn build && rm -rf node_modules public src
CMD serve -l $PORT
