FROM node:20-alpine

# Declare build arguments
ARG MONGO_URI
ARG JWT_SECRET

# Set environment variables
ENV MONGO_URI=$MONGO_URI
ENV JWT_SECRET=$JWT_SECRET

WORKDIR /app

COPY Server1/package*.json .

RUN npm install

COPY /Server1 .

EXPOSE 8000

CMD [ "node", "app.js" ]