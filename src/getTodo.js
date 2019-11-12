const { AWS } = require('../connection');

const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async function (event, context) {
  let response;
  let todoId;
  const table = "Todos";

  if (event.body) {
    let body = JSON.parse(event.body);
    todoId = body.id;
  }

  const params = {
    TableName: table,
    Key: {
      "id": todoId,
    }
  };

  try {
    const data = await docClient.get(params).promise();
    response = {
      'statusCode': 200,
      'body': JSON.stringify({
        message: data,
      })
    }
  } catch (err) {
    response = {
      'statusCode': 400,
      'body': JSON.stringify({
        message: err,
      })
    }
  }

  return response;
}
