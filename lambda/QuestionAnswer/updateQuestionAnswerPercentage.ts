const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();


async function updateQuestionAnswerPercentage(args) {
    const { id, answerText } = args;


    const updateParams = {
        TableName: process.env.TABLE_NAME_2,
        Key: {
            'id': id
        },
        UpdateExpression: "ADD #selectedCount :incr",
        ExpressionAttributeNames: {
            '#selectedCount': 'selectedCount'
        },
        ExpressionAttributeValues: {
            ':incr': 1
        },
        ReturnValues: "ALL_NEW"
    };


    try {
        const data = await docClient.update(updateParams).promise();


        const selectedCount = data.Attributes.selectedCount;
        const answers = data.Attributes.answers;


        const updateParams_ = {
            TableName: process.env.TABLE_NAME_2,
            Key: {
                'id': id
            },
            UpdateExpression: "SET #answers = :answers",
            ExpressionAttributeNames: {
                '#answers': 'answers'
            },
            ExpressionAttributeValues: {
                ':answers': answers.map((item) => {
                    if (item.text === answerText) {
                        const _ = item.selectedCount + 1;

                        return {
                            ...item,
                            selectedCount: _,
                            percentage: ( _ / selectedCount) * 100
                        }
                    }
                    else {
                        const _ = item.selectedCount;

                        return {
                            ...item,
                            percentage: ( _ / selectedCount) * 100
                        }    
                    }
                })
            }
        };


        await docClient.update(updateParams_).promise();
        return "Successful";
    }
    catch (err: any) {
        return `ERROR: ${err.message}`;
    }
}

export default updateQuestionAnswerPercentage;