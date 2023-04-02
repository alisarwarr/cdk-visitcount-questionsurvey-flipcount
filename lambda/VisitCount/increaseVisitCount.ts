const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();


async function increaseVisitCount() {
    const getParams = {
        TableName: process.env.TABLE_NAME_1,
        Key: {
            'id': 'visit_count'
        }
    };

    const updateParams = {
        TableName: process.env.TABLE_NAME_1,
        Key: {
            'id': 'visit_count'
        },
        UpdateExpression: 'SET #count = #count + :incr',
        ExpressionAttributeNames: {
            '#count': 'count'
        },
        ExpressionAttributeValues: {
            ':incr': 1
        },
        ReturnValues: 'ALL_NEW'
    };

    const putParams = {
        TableName: process.env.TABLE_NAME_1,
        Item: {
            'id': 'visit_count',
            'count': 1
        }
    };


    try {
        const data = await docClient.get(getParams).promise();


        if (data && data.Item) {
            await docClient.update(updateParams).promise();
            return "Successful";
        }


        await docClient.put(putParams).promise();
        return "Successful";
    }
    catch (err: any) {
        return `ERROR: ${err.message}`;
    }
}

export default increaseVisitCount;