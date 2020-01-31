//initialize global variable with our path
global.ABSPATH = __dirname;
global.INCPATH = ABSPATH + "/libs";

const path = require("path"); //helps to establish the right ways
const express = require("express"); //the framework itself - the shell over the node JS
const app = express(); //create our application
const apiRoutes = require("./routes");
const config = require(INCPATH + "/config"); //our common config
const log = require(INCPATH + "/log")(module); //log is a function. which is called with the current model to which
// it is connected
const cors = require("cors"); //https://github.com/expressjs/cors
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./config/swagger.yaml");

// const apiConfig = require(ABSPATH + '/api');
// app.use ->  this is middleware
app.use(cors());
// app.use('/api', apiConfig);
app.use(express.static(__dirname)); //reading static files
app.use(express.json()); //initialize json parser
app.use(express.urlencoded({ extended: true })); //pars url

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//getting static file
app.get("/", function(req, res) {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.use('/api', apiRoutes);

//listen our post, 3000
app.listen(config.get("port"), function() {
  log.info("Server start running on port " + config.get("port"));
});
