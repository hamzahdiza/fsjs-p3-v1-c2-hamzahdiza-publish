FROM node:lts-hydrogen

WORKDIR /apps

COPY . .

RUN npm install --production

ENV password_redis=a47Oub0iydGHLuF0POcycqHyfQXb70J1
ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

CMD ["node", "app.js"]