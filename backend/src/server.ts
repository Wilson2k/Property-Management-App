import app from './app';

const server = app.listen(8080, () =>
  console.log(
    'Server ready at: http://localhost:8080',
  ),
)