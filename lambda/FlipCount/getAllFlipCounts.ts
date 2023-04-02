const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();


async function getAllFlipCounts() {
    const scanParams = {
        TableName: process.env.TABLE_NAME_3
    };


    try {
        const data = await docClient.scan(scanParams).promise();
      //return data.Items;
        return data.Items.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    }
    catch (err: any) {
        return `ERROR: ${err.message}`;
    }
}

export default getAllFlipCounts;