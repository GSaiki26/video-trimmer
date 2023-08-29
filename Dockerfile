# Basics
FROM node:20-slim
WORKDIR /app

# Env
ENV TZ="America/Sao_Paulo"

# Update the container
RUN apt-get update;
RUN apt-get upgrade -y;
RUN apt-get install -y ffmpeg tzdata;
RUN npm i -g bun npm;

# Configure the user
RUN chown node /app;
USER node

# Install the dependencies
COPY --chown=node ./package.json .
COPY --chown=node ./bun.lockb .
RUN bun install

# Copy the project
COPY --chown=node ./tsconfig.json .

COPY --chown=node ./src ./src

# Run the project
CMD yarn run start:prod
