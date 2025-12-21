FROM node:20-alpine

WORKDIR /app

#install deps
COPY package.json ./
RUN npm install

# copy source
COPY . .

# prisma generate (client)
RUN npx prisma generate

# Build Next.js
RUN npm run build


EXPOSE 3000

CMD ["npm", "start"]
