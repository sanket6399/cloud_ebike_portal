AWS.config.region = "us-east-2"; // Region

// Initialize the Amazon Cognito credentials provider
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-2:50dd8e7a-d441-4969-9199-e737c1bd3f69",
});

function uploadFile(file) {
    // Check if the file type is allowed
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
        console.log("Error: Only PNG and JPEG files are allowed.");
        alert("Error: Only PNG and JPEG files are allowed.");
        return; // Stop the function execution if file is not allowed
    }

    AWS.config.credentials.get(function(err) {
        if (err) {
            console.log("There was an Error retrieving credentials: ", err);
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
                console.log("Successfully uploaded photo to S3 bucket.");
                alert("Wohooo! Successfully uploaded photo to S3 bucket. GO GREEN!");
                window.location.reload();
            },
            function(err) {
                console.log("There was an error uploading your photo in the bucket: ", err.message);
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

module.exports = { uploadFile };
