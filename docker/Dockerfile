FROM amazon/aws-lambda-nodejs:12


COPY . /schedule-executor-new


# Set working directory for future use
WORKDIR /schedule-executor-new
RUN npm install

CMD [ "src/process-lambda.handler" ]
