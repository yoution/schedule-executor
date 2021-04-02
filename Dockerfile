FROM amazon/aws-lambda-nodejs:12

# Copy function code
COPY app.js /

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "app.handler" ]
