const axios = require('axios')

exports.handler = async (event) => {


    const response = {
        statusCode: 200,
        headers: {
            'Content-Length': 5,
            'Content-Type': 'application/pdf',
            'Content-disposition': 'attachment;filename=test.pdf'
        },
        isBase64Encoded: true,
        body: "hello"
    };
    return response;
};

