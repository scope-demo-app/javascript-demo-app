FROM node:12.13.0 as builder
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install

COPY src /app/src
COPY public /app/public

ARG API_ENDPOINT=""
RUN API_ENDPOINT=${API_ENDPOINT} yarn build

FROM builder AS staging
RUN rm -f build/static/js/*.map

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=staging /app/build /usr/share/nginx/html
