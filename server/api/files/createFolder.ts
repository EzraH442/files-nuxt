import { PutObjectCommandInput } from '@aws-sdk/client-s3';
import { Options, Upload } from '@aws-sdk/lib-storage';
import { s3 } from '~/server/lib/backblaze';

export default checkAuth(async (event) => {
  const formData = await readFormData(event);

  const folderName = formData.get('folderName')?.toString() ?? '';
  const directory = formData.get('directory')?.toString() ?? '';

  const params: PutObjectCommandInput = {
    Bucket: 'ezrah442-testing',
    Key: `${directory}${folderName}/_folder`,
    ContentType: 'text/plain',
    Body: '',
  };

  const uploadOptions: Options = {
    client: s3,
    params,
  };

  try {
    const res = await new Upload(uploadOptions).done();
    console.log('res', res);

    return 'success';
  } catch (e) {
    return 'fail';
  }
});
