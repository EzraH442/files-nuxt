import { checkAuth } from '~/server/utils/checkAuth';
import { s3 } from '../../lib/backblaze';
import {
  ListObjectsV2Command,
  type ListObjectVersionsCommandInput,
} from '@aws-sdk/client-s3';
import { _RouterLinkI } from 'vue-router';
import { extractFileName, extractFolderName } from '~/utils/helpers';
export interface _Directory {
  name: string;
}

export interface _File {
  id: string;
  name: string;
}

export interface ApiReturn {
  error: string;
}

export interface ListReturn extends ApiReturn {
  files: _File[];
  directories: _Directory[];
}

export const emptyListReturn: ListReturn = {
  files: [],
  directories: [],
  error: '',
};

const removeQuotes = (s: string) => {
  return s.substring(1, s.length - 1);
};

export const addQuotes = (s: string) => {
  return `"${s}"`;
};

export default checkAuth(async (event) => {
  const q = getQuery<{ prefix?: string; delimiter?: string }>(event);

  const { prefix, delimiter } = q;

  const params: ListObjectVersionsCommandInput = { Bucket: 'ezrah442-testing' };

  if (prefix !== '') {
    params.Prefix = prefix;
  }

  if (delimiter !== '') {
    params.Delimiter = delimiter;
  }

  let response;

  console.log(params);
  try {
    response = await s3.send(new ListObjectsV2Command(params));
  } catch (e) {
    console.error(e);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
      cause: e,
    });
  }

  const directories =
    response.CommonPrefixes?.map((file) => ({
      name: extractFolderName(file.Prefix!),
    })).filter((v): v is { name: string } => !!v.name) ?? [];

  const files =
    response.Contents?.map((file) => ({
      id: removeQuotes(file.ETag!),
      name: extractFileName(file.Key ?? ''),
    })).filter((f) => f.name !== '_folder') ?? [];

  console.log(files);
  const ret: ListReturn = { files, directories, error: '' };

  return ret;
});
