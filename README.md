[![Build Status](https://app.travis-ci.com/Elshafeay/fwd-image-processing-api.svg?branch=main)](https://app.travis-ci.com/Elshafeay/fwd-image-processing-api)

# Image Processing API Project

## Table of Contents

* [Description](#Description)
* [Prerequisites](#Prerequisites)
* [Instructions](#Instructions)
* [Documentation](#Documentation)

<br>

## Description

This Project is the first project in the [egFWD](https://egfwd.com/) initiative (full-stack nanodegree).
It processes the requested image, creates a thumbnail of it with the provided dimentions 
and saves it to reuse later if someone asks for the same dimentions, 


## Prerequisites

You must have these installed on your machine:
- [node](https://nodejs.org/en/download/) v12 or higher.
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) v6 or higher.


## Instructions

After downloading the project here's a couple of things you should do in order to run it:

- Head to the project folder through your terminal and run these commands
```
npm install
npm start
```
- Then open your browser and go to `http://localhost:3000` to make sure everything is working correctly.


#### Other Scripts

```bash

# to run the tests
$ npm test

# comiling the ts files
$ npm run build

# the linting command
$ npm run lint

# to fix any linting issues
$ npm run prettier

```


## Documentation

- Using the following format, you can provide your desired width & height of any image in `public/images` folder
and a thumbnail with these dimentions will be created in `public/thumbnails`.
>`http://localhost:3000/api/images?filename=icelandwaterfall&width=200&height=200`

- if you didn't provide any width or height, you will get back the original image without any modifications. 

- The thumbnail will be created in the first time only, after that it will be served from the thumbnails folder directly.

- you will get `404` if you asked for non existing image.