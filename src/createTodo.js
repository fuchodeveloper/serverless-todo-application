const ShortUniqueId = require('short-unique-id');
const { AWS } = require('../connection');

const docClient = new AWS.DynamoDB.DocumentClient();
const uid = new ShortUniqueId();

exports.handler = async function (event, context) {
  let response;
  let todoId = uid.randomUUID(4); // unique string of length 4
  let todoBody;
  const table = "Todos";

  if (event.body) {
    let body = JSON.parse(event.body);
    todoId = todoId;
    todoBody = body.todo;
  }

  console.log('todoId', todoId);
  const params = {
    TableName: table,
    Item: {
      "id": todoId,
      "todo": todoBody
    }
  };

  try {
    const data = await docClient.put(params).promise();
    response = {
      'statusCode': 200,
      'body': JSON.stringify({
        message: 'Todo created'
      })
    }
  } catch (err) {
    response = {
      'statusCode': 400,
      'body': JSON.stringify({
        message: 'An error occurred. Todo not created. Try again!',
      })
    }
  }

  return response;
};
