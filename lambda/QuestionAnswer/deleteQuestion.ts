const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();


async function deleteQuestion(args) {
    const deleteParams = {
        TableName: process.env.TABLE_NAME_2,
        Key: {
            'id': args.id
        },
        /* this will cause the delete() method to throw an error with a message if the item does not exist in the table */
        ConditionExpression: 'attribute_exists(id)'
    };


    try {
        await docClient.delete(deleteParams).promise();
        return "Successful";
    }
    catch (err: any) {
        return `ERROR: ${err.message}`;
    }
}

export default deleteQuestion;