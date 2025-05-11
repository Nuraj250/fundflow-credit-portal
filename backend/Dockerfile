# ============================================
# @file Dockerfile
# @location /backend
# @description Docker setup for backend service
# - Uses Node.js 18 base image
# - Installs dependencies
# - Exposes port 5000
# - Runs the app using `npm start`
# ============================================

FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
