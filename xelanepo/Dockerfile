# Stage 1: Build the Vite project
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the project
RUN npm run build

# Stage 2: Serve the built project
FROM node:18-alpine AS serve

# Install a simple HTTP server to serve the built files
RUN npm install -g serve

# Copy the built files from the build stage
COPY --from=build /app/dist /app

# Expose the port the app will run on
EXPOSE 3000

# Command to serve the files
CMD ["serve", "-s", "/app", "-l", "3000"]
