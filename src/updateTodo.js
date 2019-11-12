const { AWS } = require('../connection');

const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async function (event, context) {
  let response;
  let todoId;
  let todoBody;
  const table = "Todos";

  if (event.body) {
    let body = JSON.parse(event.body);
    todoId = body.id;
    todoBody = body.todo;
  }
  
  // Update the item, unconditionally,
  const params = {
    TableName: table,
    Key: {
      "id": todoId,
    },
    UpdateExpression: "set todo = :t",
    ExpressionAttributeValues: {
      ":t": todoBody
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const data = await docClient.update(params).promise();
    response = {
      'statusCode': 200,
      'body': JSON.stringify({
        data,
        message: 'Todo updated!'
      })
    }
  } catch (err) {
    response = {
      'statusCode': 400,
      'body': JSON.stringify({
        error: err,
        message: 'Todo not updated!'
      })
    }
  }

  return response;
};
