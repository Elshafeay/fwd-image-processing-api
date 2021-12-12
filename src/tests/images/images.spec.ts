import app from '../../app';
import supertest from 'supertest';
import fsExtra from 'fs-extra';
import fs from 'fs';
import path from 'path';
import { sharpResizing } from '../../utils/common';

describe('Testing the image processing endpoint', function() {

  beforeEach(() => {
    // Emptying the thumbnail directory before each test
    fsExtra.emptyDirSync(path.join(process.cwd(), 'public/thumbnails'));
  });

  // Success scenarios
  it('creates a thumbnail', async function() {
    // status code should be 201 `Created`
    await supertest(app)
      .get('/api/images?filename=fjord&width=200&height=200')
      .expect(201);
  });

  it('creates a thumbnail once and then reuses it', async function() {
    // status code should be 201 `Created`
    await supertest(app)
      .get('/api/images?filename=fjord&width=200&height=200')
      .expect(201);

    // when retrying with the same request, status code should be 200 `OK`
    await supertest(app)
      .get('/api/images?filename=fjord&width=200&height=200')
      .expect(200);
  });

  it('returns the orignal image if there\'s no width or height passed', async function() {

    // the status code of retriving the original image should be 200 `OK`
    await supertest(app)
      .get('/api/images?filename=fjord&width=200')
      .expect(200);

    // the status code of retriving the original image should be 200 `OK`
    await supertest(app)
      .get('/api/images?filename=fjord&height=200')
      .expect(200);

    // the status code of retriving the original image should be 200 `OK`
    await supertest(app)
      .get('/api/images?filename=fjord')
      .expect(200);
  });

  // Failure scenarios
  it('returns 404 if the image doesn\'t exist', async function() {
    // status code should be 404 `Not Found`
    await supertest(app)
      .get('/api/images?filename=some-dummy-name')
      .expect(404);
  });

  it('returns 400 if the user passed invalid width or height', async function() {
    /*
      status code should be 400 `Bad Request`
      since this happends if the user enters invalid dimentions (i.e bla)
    */
    await supertest(app)
      .get('/api/images?filename=fjord&width=bla&height=bla')
      .expect(400);
  });

  it('returns 400 if it fails to resize the image', async function() {
    /*
      status code should be 400 `Bad Request`
      since this happends if the user enters invalid dimentions (i.e 200000x100000)
    */
    await supertest(app)
      .get('/api/images?filename=fjord&width=200000&height=100000')
      .expect(400);
  });

});

describe('Testing the sharp resizing functionality', function() {

  beforeEach(() => {
    // Emptying the thumbnail directory before each test
    fsExtra.emptyDirSync(path.join(process.cwd(), 'public/thumbnails'));
  });

  // Success scenarios
  it('creates a thumbnail', async function() {
    const imageName = 'fjord';
    const width = 200;
    const height = 200;

    // Thumb should be created
    const result = await sharpResizing(imageName, width, height);
    expect(result).toBeTrue();

    const thumbPath = path.join(process.cwd(), `public/thumbnails/${imageName}-${width}x${height}.jpg`);

    expect(fs.existsSync(thumbPath)).toBeTruthy();
  });

  // Failure scenarios
  it('fails to create when entering unreasonable dimentions', async function() {
    const imageName = 'fjord';
    const width = 200000;
    const height = 200000;

    // Thumb should not be created
    const result = await sharpResizing(imageName, width, height);
    expect(result).not.toBeTrue();

    const thumbPath = path.join(process.cwd(), `public/thumbnails/${imageName}-${width}x${height}.jpg`);

    expect(fs.existsSync(thumbPath)).toBeFalsy();
  });

});

afterAll(() => {
  // Emptying the thumbnail directory after all the tests
  fsExtra.emptyDirSync(path.join(process.cwd(), 'public/thumbnails'));
});