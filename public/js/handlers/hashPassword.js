const bcrypt = require("bcryptjs");

const password = "adminpass"; // Replace this with your actual password

bcrypt.genSalt(10, (err, salt) => {
  if (err) throw err;
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) throw err;
    console.log("Hashed password:", hash);
  });
});
