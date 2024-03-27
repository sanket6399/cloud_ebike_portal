AWS.config.region = "us-east-2"; // Region

// Initialize the Amazon Cognito credentials provider
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-2:e43e6f76-cee7-4e47-810a-a0a64e34fd82",
});

function uploadFile(file) {
    AWS.config.credentials.get(function(err) {
        if (err) {
            console.log("Error retrieving credentials: ", err);
            return;
        }

        console.log("Cognito Identity Id: ", AWS.config.credentials.identityId);

        const s3 = new AWS.S3({
            apiVersion: "2006-03-01",
        });

        const upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: "midterm-image-repo",
                Key: file.name,
                Body: file, 
                ContentType: file.type,
            },
        });

        const promise = upload.promise();

        promise.then(
            function(data) {
                console.log("Successfully uploaded photo.");
                alert("Successfully uploaded photo.");
            },
            function(err) {
                console.log("There was an error uploading your photo: ", err.message);
                alert("There was an error uploading your photo: " + err.message);
            }
        );
    });
}

document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const files = document.getElementById("imageInput").files;
    if (files.length > 0) {
        const file = files[0];
        uploadFile(file);
    }
});
