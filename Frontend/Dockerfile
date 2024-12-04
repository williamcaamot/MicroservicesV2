FROM node:alpine
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install
RUN npm run buildNoTsc

# Run the server
CMD ["node", "express-server.js"]