var AWS = require('aws-sdk');



// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1'; // Region
//OR
//AWS.config.update({region: 'us-west-1'});

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-1:7d6eb101-c416-4b99-9e27-b82dbd80523f",
    // Only added for authenticated users
    // the LHS is the application token generated when createing an application
    Logins: {
       'www.amazon.com': 'Amazon Access Token'
   }
});

var s3 = new AWS.S3();



AWS.config.credentials.get(function(err) {
    if (err) console.log("credentials.get: ".red + err, err.stack); /* an error occurred */
    else{
        AWS_TEMP_CREDENTIALS = AWS.config.credentials.data.Credentials;
        COGNITO_IDENTITY_ID = AWS.config.credentials.identityId;

        console.log("Cognito Temp Credentials: " + AWS_TEMP_CREDENTIALS);
        console.log(Object.getOwnPropertyNames(AWS_TEMP_CREDENTIALS));

        console.log("AccessKeyId: ",AWS_TEMP_CREDENTIALS.AccessKeyId);
        console.log("Expiration: ",AWS_TEMP_CREDENTIALS.Expiration);
        console.log("SecretKey: ",AWS_TEMP_CREDENTIALS.SecretKey);
        console.log("SessionToken: ",AWS_TEMP_CREDENTIALS.SessionToken);


        // Setting AWS config settings based on Cognito dynamic/temporary values
        // ************************* NOT NEEDED *************************
        // AWS.config.update({
        //                     accessKeyId: AWS_TEMP_CREDENTIALS.AccessKeyId,
        //                     secretAccessKey: AWS_TEMP_CREDENTIALS.SecretKey,
        //                     sessionToken: AWS_TEMP_CREDENTIALS.SessionToken,
        //                     expiration: AWS_TEMP_CREDENTIALS.Expiration
        //                 });


        console.log("Cognito Identity Id: " + COGNITO_IDENTITY_ID);


        //var params = {Bucket: 'iomra', Key: 'Great_file', Body: 'Hello World!'}; // params used for putObject
        var params = {Bucket: 'iomra', Key: 'Great_file'};  // params used for deleteObject

        //s3.putObject(params, function (err, data) {
        s3.deleteObject(params, function (err, data) {
            if (err)
                console.log(err);
            else
                console.log("Successfully uploaded data to " + params.Bucket + "/" + params.Key);
        });
  }
});
