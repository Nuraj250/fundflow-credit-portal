# frontend/Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Serve with Vite preview
EXPOSE 4173
CMD ["npm", "run", "preview"]
