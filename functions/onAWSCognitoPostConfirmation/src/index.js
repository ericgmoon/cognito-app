const AWS = require('aws-sdk');

// Set up DocClient
AWS.config.update({ region: 'ap-southeast-2' });
const docClient = new AWS.DynamoDB.DocumentClient();

// Set up Cognito IDP
const cognitoIdp = new AWS.CognitoIdentityServiceProvider();

const getAccountDetailsFromPhoneNumber = async (phoneNumber) => {
  if (phoneNumber) {
    const params = {
      TableName: 'approvedAccounts',
      Key: { phoneNumber },
    };
    const data = await docClient.get(params).promise();

    if (data.Item) return data.Item || {};
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

const createStudentEntry = async (entry) => {
  const params = {
    TableName: 'students',
    Item: entry,
  };
  await docClient.put(params).promise();
};

const createStaffEntry = async (entry) => {
  const params = {
    TableName: 'staff',
    Item: entry,
  };
  await docClient.put(params).promise();
};

const addCognitoUserToGroup = async (userPoolId, username, group) => {
  const params = {
    GroupName: group,
    UserPoolId: userPoolId,
    Username: username,
  };
  await cognitoIdp.adminAddUserToGroup(params).promise();
};

exports.handler = async (event, _context, callback) => {
  try {
    const accountId = event.request.userAttributes.sub;
    const phoneNumber = event.request.userAttributes.phone_number;
    const { userPoolId, userName } = event;

    // Only run this trigger for post-confirmation of sign ups
    const isFromSignUp = event.triggerSource === 'PostConfirmation_ConfirmSignUp';

    if (isFromSignUp && accountId && phoneNumber) {
      // Get the account details
      const { accountDetails, group } = await getAccountDetailsFromPhoneNumber(phoneNumber);
      if (!accountDetails) return { statusCode: 400 };

      // Register group on AWS Cognito
      console.log(`${userPoolId} ${userName} ${group}`);
      await addCognitoUserToGroup(userPoolId, userName, group);

      // Remove account from the approvedAccounts table
      await deleteApprovedAccount(phoneNumber);

      if (group === 'Admins' || group === 'Managers' || group === 'Owners' || group === 'Tutors') {
        // Create entry on the staff table
        await createStaffEntry({
          ...accountDetails,
          staffId: accountId,
          phoneNumber,
          email: event.request.userAttributes.email,
          primaryGroup: group,
          groups: [group],
          createdAt: new Date().getTime(),
        });
      } else {
        // Create entry on the students table
        await createStudentEntry({
          ...accountDetails,
          studentId: accountId,
          phoneNumber,
          email: event.request.userAttributes.email,
          tutorials: [],
          createdAt: new Date().getTime(),
        });
      }

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
