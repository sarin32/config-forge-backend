# Stage 1: Builder
FROM ubuntu:20.04 AS builder

WORKDIR /app

# Install Node.js
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs
    
# Install dependencies to build native addons
RUN apk add --no-cache python3 make g++

# Install MongoDB enterprise version
RUN apk add --no-cache gnupg curl && \
    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
    gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor && \
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
    tee /etc/apk/repositories && \
    apk update && \
    apk add mongodb-org

# Copy the entire content of the local directory into the Docker image
COPY . .

# Install dependencies and build the application
RUN npm install
RUN npm run build:prod

# Stage 2: Final
FROM node:20-alpine AS final

WORKDIR /app

# Install MongoDB enterprise version
RUN apk add --no-cache gnupg curl && \
    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
    gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor && \
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
    tee /etc/apk/repositories && \
    apk update && \
    apk add mongodb-org


# Copy the built files from the 'builder' stage
COPY --from=builder /app/build .

# copy assets
COPY src/assets ./src/assets

# Copy package.json and package-lock.json for production
COPY package.json .
COPY package-lock.json .

# Install only production dependencies
RUN npm install --only=production

# Set the default port as an environment variable
ENV PORT=3000

# Expose the port that the app will listen on
EXPOSE $PORT

# Set the command to start the application
CMD ["npm","run", "start:prod"]
