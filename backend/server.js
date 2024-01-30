const app = require("./app");

const connectedDatabase = require("./config/database");

connectedDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server listening on ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

//unhanled Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled rejection`);
  server.close(() => {
    process.exit(1);
  });
});

//uncaughtException
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);
  server.close(() => {
    process.exit(1);
  });
});
