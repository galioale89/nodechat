const app = require('./app');

const server = app.listen(3001, () => {
    console.log(`App express is running in 3001`);
});