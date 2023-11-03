const AWS = require('aws-sdk');

// Configure AWS SDK with your credentials
AWS.config.update({
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    region: 'YOUR_AWS_REGION' // Specify the AWS region you are working in
});

document.getElementById("payButton").addEventListener("click", function() {
    // Get payment information from the form
    const cardNumber = document.getElementById("cardNumber").value;

    // Construct the input data for your SageMaker endpoint
    const inputData = {
        cardNumber: cardNumber,
        // Add other payment information here
    };

    // Make a request to the SageMaker endpoint
    // Replace 'sagemakerEndpointURL' with your actual endpoint URL
    const sagemakerEndpointURL = 'YOUR_SAGEMAKER_ENDPOINT_URL';
    const sagemaker = new AWS.SageMakerRuntime();
    sagemaker.invokeEndpoint({
        EndpointName: sagemakerEndpointURL,
        ContentType: 'application/json',
        Body: JSON.stringify(inputData)
    }, function(err, data) {
        if (err) {
            console.error("Error invoking SageMaker endpoint:", err);
            document.getElementById("result").innerHTML = "Payment Failed";
        } else {
            console.log("SageMaker response:", data);
            document.getElementById("result").innerHTML = "Payment Successful";
        }
    });
});
