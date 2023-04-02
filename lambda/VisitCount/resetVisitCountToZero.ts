const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();


async function resetVisitCountToZero() {
    const updateParams = {
        TableName: process.env.TABLE_NAME_1,
        Key: {
            'id': 'visit_count'
        },
        UpdateExpression: 'SET #count = :zero',
        ExpressionAttributeNames: {
            '#count': 'count'
        },
        ExpressionAttributeValues: {
            ':zero': 0
        },
        ReturnValues: 'ALL_NEW'
    };


    try {
        await docClient.update(updateParams).promise();
        return "Successful";
    }
    catch (err: any) {
        return `ERROR: ${err.message}`;
    }
}

export default resetVisitCountToZero;