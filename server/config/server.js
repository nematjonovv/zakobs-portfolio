const app = require("../index");
const sequelize = require('../config/db')
const PORT = process.env.PORT || 7070;


sequelize.authenticate()
    .then(() => console.log("Successfully connected to DB"))
    .catch((err) => console.log(`Error to connecting DB: ${err}`))
sequelize.sync({alter:true})
    .then(() => console.log("Model created successfully"))
    .catch((err) => console.log(`Error creating model: ${err}`))



app.listen(PORT, () =>
  console.log(`Listening on port: http://localhost:${PORT}`)
);
