FROM node:lts-hydrogen

WORKDIR /apps

COPY . .

RUN npm install --production

ENV MONGO_STRING=mongodb+srv://hamzahdiza:qK4PKSz1CODbXIjd@p3c2.b1yuyjc.mongodb.net/test
ENV NODE_ENV=production
ENV PORT=4001


EXPOSE 4001

CMD ["node", "app.js"]