"use strict";
const AWS = require("aws-sdk");
const SES = new AWS.SES();

exports.birthdayReminder = async (event) => {
  console.log("event", event);

  const message = `Hey Sam
  
Don't forget to film next weeks serverless video`;

  const params = {
    Destination: {
      ToAddresses: ["franklinserif@gmail.com"],
    },
    Message: {
      Body: {
        Text: { Data: message },
      },
      Subject: { Data: "reminder email" },
    },
    Source: "franklinserif@gmail.com",
  };

  try {
    await SES.sendEmail(params).promise();
    return { statusCode: 200, message: "email sent" };
  } catch (error) {
    console.log("error", error);
    return { statusCode: 400, message: "failed to send the email" };
  }
};
