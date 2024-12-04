FROM node:20.1.0-alpine
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

EXPOSE 5173

# Run the server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--mode", "production"]
