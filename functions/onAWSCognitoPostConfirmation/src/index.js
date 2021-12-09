const AWS = require('aws-sdk');

// Set up DocClient
AWS.config.update({ region: 'ap-southeast-2' });
const docClient = new AWS.DynamoDB.DocumentClient();

const getStudentDetailsFromPhoneNumber = async (phoneNumber) => {
  if (phoneNumber) {
    const params = {
      TableName: 'approvedAccounts',
      Key: { phoneNumber },
    };
    const data = await docClient.get(params).promise();

    if (data.Item) return data.Item.studentDetails || {};
    return false;
  }
  return false;
};

const deleteApprovedAccount = async (phoneNumber) => {
  if (phoneNumber) {
    const params = {
      TableName: 'approvedAccounts',
      Key: { phoneNumber },
    };
    await docClient.delete(params).promise();
  }
};

const createStudentEntry = async (studentItem) => {
  const params = {
    TableName: 'students',
    Item: studentItem,
  };
  await docClient.put(params).promise();
};

exports.handler = async (event, _context, callback) => {
  const studentId = event.request.userAttributes.sub;
  const phoneNumber = event.request.userAttributes.phone_number;

  try {
    if (studentId && phoneNumber) {
      // Get the student details
      const studentDetails = await getStudentDetailsFromPhoneNumber(phoneNumber);
      if (!studentDetails) return { statusCode: 400 };

      // Remove the student from the approvedAccounts table
      await deleteApprovedAccount(phoneNumber);

      // Create student item on the students table
      const studentItem = {
        ...studentDetails,
        studentId,
        phoneNumber,
        username: event.request.userName,
        email: event.request.userAttributes.email,
        createdAt: new Date().getTime(),
      };
      await createStudentEntry(studentItem);

      // Return to AWS Cognito
      return callback(null, event);
    }

    console.error('Error: User details were not passed to the post-confirmation hook. Nothing was written to DynamoDB.');
    return callback(null, event);
  } catch (err) {
    console.error(err);
    return callback(null, event);
  }
};
