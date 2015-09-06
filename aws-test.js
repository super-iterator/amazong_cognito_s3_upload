
// Reference: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjects-property

try {

    var AWS = require('aws-sdk');
    var s3 = new AWS.S3();





        // Cognito Identity is currently only available in us-east-1
    // var ci = new AWS.CognitoIdentity({region: 'us-east-1'});
    //
    // var parameters = {
    //   AllowUnauthenticatedIdentities: false,
    //   IdentityPoolName: 'MyApplicationPool',
    //   Logins: {
    //     'www.amazon.com': 'amzn1.application-oa2-client.84dfe675f8e24e47825406d44f704459'
    //   }
    // };
    // ci.createIdentityPool(parameters, console.log);








    var params = {
    //AccountId: "647642783322", /* required */
    //RoleArn: "arn:aws:iam::647642787862:role/Cognito_iomra_imagesAuth_Role",  /* required */
    //IdentityPoolId: "us-east-1:81b40r455-c505-4faa-9f57-91ecaafef74f", /* required */
    IdentityPoolId: 'us-east-1:7d6eb101-c345-4b99-9e27-b82dbd805d3f',
    // Logins: {
    //   'www.amazon.com': "amzn1.application-oa2-client.8fgt6675f8e24e47825406d44f704a89"
    // }
    };

    AWS.config.region = 'us-east-1';

    AWS.config.credentials = new AWS.CognitoIdentityCredentials(params);


    AWS.config.credentials.get(function(err) {
    if (err) console.log("credentials.get: ".red + err, err.stack); /* an error occurred */
      else{
            AWS_TEMP_CREDENTIALS = AWS.config.credentials.data.Credentials;
            COGNITO_IDENTITY_ID = AWS.config.credentials.identityId;
            console.log("Cognito Identity Id: ".green + COGNITO_IDENTITY_ID);
      }
  });

    console.log("AWS credentials: \n");
    console.log(AWS.config.credentials);


    //  AWS.Login.authorize({scope: "profile"}, function(resp) {
    //   if (!resp.error) { // logged in
    //     var creds = AWS.config.credentials;
    //     creds.params.RoleArn =
    //       'arn:aws:iam::647642783322:role/Cognito_iomra_imagesAuth_Role';
    //     creds.params.Logins = {
    //       'www.amazon.com': resp.access_token
    //     };
    //
    //     // manually expire credentials so next request will fire a refresh()
    //     creds.expired = true;
    //   }
    // });




    //  s3.createBucket({Bucket: 'myBucket_popo'}, function() {
    //
    //   var params = {Bucket: 'myBucket', Key: 'myKey', Body: 'Hello!'};
    //
    //   s3.putObject(params, function(err, data) {
    //
    //       if (err) console.log(err);
    //
    //       else console.log("Successfully uploaded data to myBucket/myKey");
    //
    //    });
    //
    // });

    buckets = {
        Bucket : 'ixertomra'
    };

    s3.listObjects(buckets, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });


} catch (e) {
    console.log(e.stack);
}
