FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# Use non-root user for security
USER node

EXPOSE 3000

# Point to the new entry file
CMD ["node", "src/server.js"]