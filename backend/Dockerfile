FROM node:24

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose app port
EXPOSE 4000


# Default environment
ENV NODE_ENV=docker

# Run migrations, seeds, then start the app
CMD ["sh", "-c", "npm run migrate && npm start"]

