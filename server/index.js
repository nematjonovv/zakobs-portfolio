const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { SwaggerTheme, SwaggerThemeNameEnum } = require("swagger-themes");
// SWAGGER OPTIONS
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zakobs-Portfolio",
      version: "1.0.0",
      description: "Zakob-Portfolio's server",
    },
  },
  apis: ["./routes/*.js"],
};

const theme = new SwaggerTheme();
const options = {
  explorer: true,
  customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA),
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, options));

// ROUTES
// auth route
app.use("/", require("./routes/auth.route"));
// service route
app.use("/", require("./routes/services.route"));
// projects route
app.use("/", require("./routes/projects.route"));
// clients route
app.use("/", require("./routes/clients.route"));
// testimonials route
app.use("/", require("./routes/testimonials.route"));
// blog route
app.use("/", require("./routes/blog.route"));
// request route
app.use("/", require("./routes/requests.route"));
// contact route
app.use("/", require("./routes/contact.route"));
module.exports = app;
