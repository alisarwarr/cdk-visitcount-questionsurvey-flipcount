const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();


async function addQuestion(args) {
    const putParams = {
        TableName: process.env.TABLE_NAME_2,
        Item: args.content,
        /* this will cause the delete() method to throw an error with a message if the item does not exist in the table */
        ConditionExpression: 'attribute_not_exists(id)'
    };


    try {
        await docClient.put(putParams).promise();
        return "Successful";
    }
    catch (err: any) {
        return `ERROR: ${err.message}`;
    }
}

export default addQuestion;