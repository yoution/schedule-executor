FROM amazon/aws-lambda-nodejs:12


COPY src package.json ./


# Set working directory for future use
RUN npm install

# Set working directory for future use

CMD [ "src/app.handler" ]
