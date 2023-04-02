const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();


async function increaseFlipCount(args) {
    const updateParams = {
        TableName: process.env.TABLE_NAME_3,
        Key: {
            'id': args.id
        },
        UpdateExpression: "SET #count = #count + :incr",
        ExpressionAttributeNames: {
            '#count': 'count'
        },
        ExpressionAttributeValues: {
            ':incr': 1
        },
        ReturnValues: "ALL_NEW"
    };


    try {
        await docClient.update(updateParams).promise();
        return "Successful";
    }
    catch (err: any) {
        return `ERROR: ${err.message}`;
    }
}

export default increaseFlipCount;