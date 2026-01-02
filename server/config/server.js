const app = require("../index");
const sequelize = require('../config/db');
const Users = require("../models/users.model");
const { where } = require("sequelize");
const PORT = process.env.PORT || 7070;
const bcrypt = require("bcryptjs")

sequelize.authenticate()
    .then(() => console.log("Successfully connected to DB"))
    .catch((err) => console.log(`Error to connecting DB: ${err}`))
sequelize.sync()
    .then(async () => {
      console.log("Model created successfully")

      const admin = await Users.findOne({where: {role: 'admin'}})

      if(!admin) {
        await Users.create({
          username: process.env.ADMIN_NAME,
          password: await bcrypt.hash(process.env.ADMIN_PASS, 10),
          role: "admin"
        });
        console.log("Default admin created ✅");
        
      }
    })
    .catch((err) => console.log(`Error creating model: ${err}`))



app.listen(PORT, () =>
  console.log(`Listening on port: http://localhost:${PORT}`)
);
