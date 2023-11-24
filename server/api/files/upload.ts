import { Upload, type Options } from '@aws-sdk/lib-storage';
import { PassThrough } from 'node:stream';
import { s3 } from '../../lib/backblaze';
import formidable from 'formidable';
import type { PutObjectCommandInput } from '@aws-sdk/client-s3';
import { checkAuth } from '~/server/utils/checkAuth';

interface UploadStreamParams {
  Bucket: string;
  Key: string;
  type: string;
}

const uploadStream = ({ Bucket, Key, type }: UploadStreamParams) => {
  const pass = new PassThrough();

  const params: PutObjectCommandInput = {
    Bucket,
    Key,
    ContentType: type,
    Body: pass,
  };
  const uploadOptions: Options = {
    client: s3,
    params,
  };

  return {
    writeStream: pass,
    promise: new Upload(uploadOptions).done(),
  };
};

export default checkAuth(async (event) => {
  const form = formidable();

  form.onPart = (part) => {
    if (!part.originalFilename || !part.mimetype) {
      return;
    }

    const uploadStreamParams: UploadStreamParams = {
      Bucket: 'ezrah442-testing',
      Key: part.name!,
      type: part.mimetype,
    };

    const { writeStream, promise } = uploadStream(uploadStreamParams);

    promise
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        console.error(e);
      });

    part.pipe(writeStream);
  };

  try {
    await form.parse(event.node.req);

    return true;
  } catch (e) {
    return false;
  }
});
