# BUILD FOR LOCAL DEVELOPMENT
FROM node:20-alpine AS development

WORKDIR /usr/src/app

# Copy package.json and yarn.lock files, setting ownership to 'node' user
COPY --chown=node:node package*.json yarn.lock ./

# Install dependencies using Yarn, ensuring consistent installs with the lockfile
RUN yarn install --frozen-lockfile

# Copy the rest of the application code, setting ownership to 'node' user
COPY --chown=node:node . .

# Switch to 'node' user for running the application
USER node


# BUILD FOR PRODUCTION
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Copy package.json and yarn.lock files, setting ownership to 'node' user
COPY --chown=node:node package*.json yarn.lock ./

# Copy node_modules from the development stage
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# Copy the rest of the application code, setting ownership to 'node' user
COPY --chown=node:node . .

# Build the application using Yarn
RUN yarn build

# Set the environment to production
ENV NODE_ENV production

# Install only production dependencies and clean the Yarn cache
RUN yarn install --frozen-lockfile --production && yarn cache clean

# Switch to 'node' user for running the application
USER node


# PRODUCTION
FROM node:20-alpine AS production

# Copy node_modules from the build stage
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules

# Copy the built application from the build stage
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Command to run the application
CMD ["node", "dist/main.js"]
