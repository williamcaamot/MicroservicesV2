# Stage 1: Build the Vite application
FROM node:16-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
# Set environment variable for proxy target during build
ARG VITE_API_PROXY_TARGET
ENV VITE_API_PROXY_TARGET=$VITE_API_PROXY_TARGET
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
