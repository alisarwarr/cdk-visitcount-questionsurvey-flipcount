const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();


async function addAllQuestions(args) {
    const putParams = args.content.map((item) => {
        return {
            PutRequest: {
                Item: item
            }
        }
    });


    const params = {
        RequestItems: {
            [`${process.env.TABLE_NAME_2}`]: putParams
        }
    };


    try {
        await docClient.batchWrite(params).promise();
        return "Successful";
    }
    catch (err: any) {
        return `ERROR: ${err.message}`;
    }
}

export default addAllQuestions;