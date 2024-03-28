jest.mock('aws-sdk'); // This uses the mock AWS SDK we defined earlier

const { uploadFile } = require('./script.js');
const AWS = require('aws-sdk');

describe('uploadFile function', () => {
    beforeEach(() => {
        // Reset mocks before each test
        AWS.S3.ManagedUpload.mockClear();
        global.alert.mockClear();
        global.console.log.mockClear();
    });

    it('successfully uploads an allowed file type', async () => {
        const mockFile = new File([""], "test.png", { type: "image/png" });
        
        uploadFile(mockFile);
        await new Promise(resolve => setTimeout(resolve, 0)); // Wait for promise resolution

        expect(AWS.S3.ManagedUpload).toHaveBeenCalled();
        expect(global.alert).toHaveBeenCalledWith("Successfully uploaded photo.");
    });

});
