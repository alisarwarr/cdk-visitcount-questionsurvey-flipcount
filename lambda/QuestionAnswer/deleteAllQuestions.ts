const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();


async function deleteAllQuestions() {
    const scanParams = {
        TableName: process.env.TABLE_NAME_2,
        Select: 'ALL_ATTRIBUTES'
    };


    try {
        const scanResult = await docClient.scan(scanParams).promise();


        if (scanResult.Items && scanResult.Items.length > 0) {
            const deleteParams = scanResult.Items.map((item) => {
                return {
                    DeleteRequest: {
                        Key: {
                            id: item.id
                        }
                    }
                };
            });


            const batchParams = {
                RequestItems: {
                    [`${process.env.TABLE_NAME_2}`]: deleteParams
                }
            };


            await docClient.batchWrite(batchParams).promise();
        }


        return "Successful";
    }
    catch (err: any) {
        return `ERROR: ${err.message}`;
    }
}

export default deleteAllQuestions;