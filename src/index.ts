import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { db } from "./database";
import Router from "./routers";
import { authTokenValidator } from "./routers/intercepter";
import {
  clientErrorHandler,
  errorHandler,
  logErrors,
} from "./utils/ErrorHandler";
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
app.use(authTokenValidator);
app.use(Router);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
// init database
db.connection;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
