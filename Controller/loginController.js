const db = require("../Module/allData"); // Import your database connection
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

exports.login = (req, res) => {
  console.log("Request received for /login");
  const { email, password, role_id } = req.body;

  console.log("Email:", email);
  console.log("Password:", password);
  console.log("role_id:", role_id);

  try {
    const query = `SELECT email, password, role_id FROM users WHERE email = ?`;

    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      console.log("Query Results:", results);

      if (results.length === 0) {
        console.error("No user found with email:", email);
        return res
          .status(401)
          .json({ status: "error", message: "Invalid email or password" });
      }

      const user = results[0];
      console.log("Stored Password:", user.password); // Add this line for debugging

      const isPasswordValid = await bcrypt.compare(password, user.password);

      console.log("isPasswordValid:", isPasswordValid);

      if (!isPasswordValid) {
        console.error("Invalid password for email:", email);
        return res
          .status(401)
          .json({ status: "error", message: "Invalid email or password" });
      }

      //  Generate a JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.SECRETKEY,
        { expiresIn: "1h" }
      );
      console.log(`token: ${token}`);
      // Send the token in the response
      return res
      .status(200)
      .json({ status: "success", token, message: "Login successful",role_id:user.role_id });
  });
  } catch (err) {
    console.log(err);
    return res.json({ error: err });
  }
};





exports.getUsers = (req, res) => {
  const query = "SELECT *  FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
};




exports.getUserById = (req, res) => {
  console.log("Request received for /user/:id");
  
  // Extract the user ID from the request parameters
  const userId = req.params.id;

  try {
    // Query the database to retrieve user data by ID
    const query = "SELECT username , email , password , role_id FROM users WHERE id = ?";
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      
      // Check if a user with the given ID exists
      if (results.length === 0) {
        console.error("No user found with ID:", userId);
        return res.status(404).json({ status: "error", message: "User not found" });
      }
      
      // Return the user data in the response
      const user = results[0];
      res.status(200).json({ status: "success", user });
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: err });
  }
};






// Create an update controller
exports.updateProfile = (req, res) => {
  console.log("Request received for updating profile");
  const { email, newPassword, newUsername, newEmail } = req.body;

  console.log("Email:", email);
  console.log("New Password:", newPassword);
  console.log("New Username:", newUsername);
  console.log("New Email:", newEmail);

  try {
    // Check if the user exists based on their email
    const checkUserQuery = "SELECT id, password, username, email FROM users WHERE email = ?";
    db.query(checkUserQuery, [email], async (err, userResults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      // Check if a user with the given email exists
      if (userResults.length === 0) {
        console.error("No user found with email:", email);
        return res.status(401).json({ status: "error", message: "User not found" });
      }

      const user = userResults[0];
      console.log("User ID:", user.id);

      // Update the user's password if newPassword is provided
      if (newPassword) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        const updatePasswordQuery = "UPDATE users SET password = ? WHERE id = ?";
        db.query(updatePasswordQuery, [hashedNewPassword, user.id], (updateErr) => {
          if (updateErr) {
            console.error("Error updating password:", updateErr);
            return res.status(500).json({ status: "error", message: "Error updating password" });
          }
        });
      }

      // Update the user's username if newUsername is provided
      if (newUsername) {
        // Update the user's username in the database
        const updateUsernameQuery = "UPDATE users SET username = ? WHERE id = ?";
        db.query(updateUsernameQuery, [newUsername, user.id], (updateErr) => {
          if (updateErr) {
            console.error("Error updating username:", updateErr);
            return res.status(500).json({ status: "error", message: "Error updating username" });
          }
        });
      }

      // Update the user's email if newEmail is provided
      if (newEmail) {
        // Update the user's email in the database
        const updateEmailQuery = "UPDATE users SET email = ? WHERE id = ?";
        db.query(updateEmailQuery, [newEmail, user.id], (updateErr) => {
          if (updateErr) {
            console.error("Error updating email:", updateErr);
            return res.status(500).json({ status: "error", message: "Error updating email" });
          }
        });
      }

      // Respond with a success message
      return res.status(200).json({ status: "success", message: "Profile updated successfully" });
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: err });
  }
};