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
<<<<<<< HEAD
FROM node:18-bookworm AS production

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install --omit=dev

COPY --from=build /app/dist /app/

CMD ["node", "app.js"]
=======
# FROM nginx AS production

# COPY --from=build /app/dist/project-dw-frontend /usr/share/nginx/html/
# COPY nginx.conf /etc/nginx/conf.d/default.conf
>>>>>>> 03dd1ee3 (Remove dist dir)
