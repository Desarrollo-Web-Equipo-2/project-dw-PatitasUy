##
## Build
##
FROM node:18-bookworm AS build

WORKDIR /app
COPY . /app

RUN npm install
RUN npm install @ionic/cli
RUN npx ionic build --prod


##
## Production
##
FROM nginx AS production

COPY --from=build /app/patitasuy/www /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf