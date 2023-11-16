# Stage 1: Build the TypeScript application
FROM node:20 as builder

# Create app directory
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy the necessary files for installing dependencies
COPY pnpm-lock.yaml nx.json package.json ./

# Install app dependencies
RUN pnpm install

# Copy the rest of the application source code
COPY . .

# Build the specific NX project
RUN npx nx build server

# Stage 2: Setup the production environment and run the app
FROM node:20

WORKDIR /usr/src/app

# Install pnpm in the production image
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod

# Copy the built app from the builder stage
COPY --from=builder /usr/src/app/dist/server ./dist

EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
USER node

CMD node ./dist/main.js
