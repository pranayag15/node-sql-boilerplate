import app from "./config/express";
require('colors')

let PORT 

if (process.env.NODE_ENV === "test") {
  PORT = process.env.TEST_PORT;
} else {
  PORT = process.env.PORT;
}

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express server listening on port ${PORT}.\
    \nEnvironment: ${process.env.NODE_ENV}`.green);
});

export default server;
