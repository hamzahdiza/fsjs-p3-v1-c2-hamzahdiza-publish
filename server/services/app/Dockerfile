FROM node:lts-hydrogen

WORKDIR /apps

COPY . .

RUN npm install --production

ENV DATABASE_URL=postgres://postgres:YSHpW59qq9cg88_@db.zbctlaidxgvzmvpidozz.supabase.co:6543/postgres
ENV NODE_ENV=production
ENV PORT=4002


EXPOSE 4002

CMD ["node", "app.js"]