import sharp from 'sharp';
import { convert } from '~/server/lib/convert';
import { isHEIC, isImage, isVideo } from '~/utils/helpers';

export default checkAuth(async (e) => {
  const query = getQuery<{ filename?: string; quality?: string }>(e);
  const file = query?.filename?.toString() ?? '';

  let quality;

  try {
    if (query.quality) {
      quality = parseInt(query.quality);
    } else {
      quality = 50;
    }
  } catch (e) {
    quality = 50;
  }

  const token = getCookie(e, 'token');
  const url = `https://static.ezrahuang.com/file/ezrah442-testing/${file}?token=${token}`;

  if (!file) {
    return;
  }

  const f = await $fetch<Blob>(url);
  console.log(f);

  try {
    if (isVideo(file)) {
      return f;
    } else if (isHEIC(file) || isImage(file)) {
      let data: ArrayBuffer;

      if (isHEIC(file)) {
        data = await convert(f);
        return data;
      } else {
        return f;
      }

      // const im = sharp(data);
      // const metadata = await im.metadata();

      // return im.resize(400).withMetadata().png({ quality });
    }

    return f;
  } catch (e) {
    console.error(e);
  }
});
