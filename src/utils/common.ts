import * as path from 'path';
import sharp from 'sharp';

const sharpResizing = async(imageName: string, width: number, height: number): Promise<boolean> => {
  const thumbPath = path.join(process.cwd(), `public/thumbnails/${imageName}-${width}x${height}.jpg`);
  const imagePath = path.join(process.cwd(), `public/images/${imageName}.jpg`);

  // Promisifying the process
  const sharpPromise = async (): Promise<boolean> => {
    return new Promise ((resolve, reject) => {
      sharp(imagePath)
        .resize(width, height)
        .toFile(thumbPath, (err, info) => {
          if(err){
          // Failed the resize the image
            resolve(false);
          }else{
            resolve(true);
          }
        });
    });
  };

  return sharpPromise();

};

const htmlError = (statment: string): string => {
  // Some decorations to make the errors big and in red.
  return `<h1 style="color:red;">${statment}</h1>`;
};

export { htmlError, sharpResizing };
