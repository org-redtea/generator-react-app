# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
FROM node:10.15.0-alpine as build

ARG PORT=80
#ARG REACT_APP_ENV

ENV PORT=$PORT
#ENV REACT_APP_ENV=$ARG REACT_APP_ENV

WORKDIR /home/node/app

COPY . .

RUN yarn && yarn build && rm -rf node_modules public src

FROM nginx:1.14.2-alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/
COPY --from=build /home/node/app/build /usr/share/nginx/html
