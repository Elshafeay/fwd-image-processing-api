import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { htmlError, sharpResizing } from '../../../utils/common';
const { query, validationResult } = require('express-validator');

const router = express.Router();

router.get('/', [

  // making some validation on the width & height
  query('width').optional().isInt(),
  query('height').optional().isInt(),

], async (req: Request, res: Response): Promise<void|Response> => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // User provided invalid width or height
    return res.status(400).send(htmlError('Invalid Height/Width Parameters!'));
  }

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