import app from './app';

const port = 3000;

// Starting the server
app.listen(port, () => {
  console.log(`Your server is up and running on port ${port}`);
});