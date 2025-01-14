FROM node:20-alpine

# Declare build arguments
ARG MONGO_URI

# Set environment variables
ENV MONGO_URI=$MONGO_URI

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8001

CMD [ "node", "app.js" ]