##
## Build
##
FROM node:18-bookworm AS build

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build


##
## Production
##
# FROM nginx AS production

# COPY --from=build /app/dist/project-dw-frontend /usr/share/nginx/html/
# COPY nginx.conf /etc/nginx/conf.d/default.conf