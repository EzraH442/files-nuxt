import { PutObjectCommandInput } from '@aws-sdk/client-s3';
import { Options, Upload } from '@aws-sdk/lib-storage';
import { s3 } from '~/server/lib/backblaze';

export default checkAuth(async (event) => {
  readFormData(event);

  const params: PutObjectCommandInput = {
    Bucket: 'ezrah442-testing',
    Key: '_folder',
    ContentType: 'text/plain',
    Body: '',
  };

  const uploadOptions: Options = {
    client: s3,
    params,
  };

  try {
    new Upload(uploadOptions);

    return 'success';
  } catch (e) {
    return 'fail';
  }
});
