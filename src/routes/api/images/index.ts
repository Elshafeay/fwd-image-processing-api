import express from 'express';
import * as path from 'path';
import fs from 'fs';
import { htmlError, sharpResizing } from '../../../utils/common';

const router = express.Router();

router.get('/', async (req, res) => {
  const { filename: imageName, width, height } = req.query;

  const thumbPath = path.join(process.cwd(), `public/thumbnails/${imageName}-${width}x${height}.jpg`);
  const imagePath = path.join(process.cwd(), `public/images/${imageName}.jpg`);

  // Checking if the image exists
  if(!fs.existsSync(imagePath)){
    // Image doesn't exist, So we're sending an Error.
    return res.status(404).send(htmlError('This image doesn\'t exist!'));
  }

  // Checking if the user provided width & height
  if(!width || !height){
    // No width or height are provided, So we're sending the original file
    return res.sendFile(imagePath);
  }

  // Checking if there's a thumbnail with the same required dimentions for that image
  if(fs.existsSync(thumbPath)){
    // Thumbnail exists, So we're sending it.
    return res.sendFile(thumbPath);
  }

  // Thumbnail doesn't exist, So we're creating a one.
  const result = await sharpResizing(<string>imageName, +width, +height);

  if(result){
    // Successfully created a thumbnail

    // Sending the newly created thumbnail
    res.status(201).sendFile(thumbPath);

  }else{
    // Failed the resize the image / create a thumbnail
    res.status(400).send(htmlError('Failed the resize the image'));
  }

});

export default router;