import libheif from 'libheif-js/wasm-bundle.js';
import { PNG } from 'pngjs';

export const convert = async (f: Blob) => {
  const decoder = new libheif.HeifDecoder();
  const data = decoder.decode(await f.arrayBuffer());
  const image = data[0];
  const width = image.get_width();
  const height = image.get_height();

  const imageData: any = await new Promise((resolve, reject) => {
    image.display(
      { data: new Uint8ClampedArray(width * height * 4), width, height },
      (displayData: any) => {
        if (!displayData) {
          return reject(new Error('HEIF processing error'));
        }

        resolve(displayData);
      },
    );
  });

  const png = new PNG({ width: imageData.width, height: imageData.height });
  png.data = imageData.data;
  const pngBuffer = PNG.sync.write(png);

  return pngBuffer;
};
