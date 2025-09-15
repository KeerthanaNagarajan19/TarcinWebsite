FROM node:22

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install ts-node-dev globally (optional, you can also run via package.json)
RUN npm install -g ts-node-dev

# Copy the source code
COPY . .

# Expose the backend port
EXPOSE 5000

CMD ["npm", "run", "dev"]