FROM node:16.14.2-buster As build

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

FROM node:16.14.2-buster

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./

RUN npm ci --omit=dev

# CMD ["node", "dist/main"]
CMD ["npm", "run", "start"]
