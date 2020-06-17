FROM strapi/base

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --network-timeout 1000000

COPY . .

RUN yarn build

EXPOSE 1337

ENV NODE_ENV production

CMD ["yarn", "start"]
