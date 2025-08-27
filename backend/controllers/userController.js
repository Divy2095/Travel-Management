const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, password, confirmPassword, login_type } = req.body;

  if (!name || !email || !password || !confirmPassword || !login_type) {
    return res.status(400).json({
      success: false,
      message: "Fill all the details.",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password does not match. Please check again.",
    });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database query error while checking user.",
        });
      }

      if (results.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Email already registered.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // 🎨 DiceBear Avatar generation
      const image = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
        name
      )}&radius=50&backgroundColor=ffd5dc&fontSize=40`;

      console.log("🔍 Generated avatar URL:", image);

      const sql = `
        INSERT INTO users 
        (name, email, password, login_type, image, entry_by, entry_date) 
        VALUES (?, ?, ?, ?, ?, ?, NOW())`;

      db.query(
        sql,
        [name, email, hashedPassword, login_type, image, email],
        (err, results) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Error while inserting User details.",
            });
          }
          console.log("✅ Inserted user with ID:", results.insertId);
          return res.status(200).json({
            success: true,
            message: "User registered Successfully.",
            user: {
              id: results.insertId,
              name: name,
              email: email,
              image: image,
            },
          });
        }
      );
    }
  );
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all details.",
    });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database query error",
        });
      }

      if (results.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password.",
        });
      }

      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password.",
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" }
      );

      return res.status(200).json({
        success: true,
        message: "Login Successful!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          login_type: user.login_type,
          status: user.status,
          image: user.image,
        },
        token: token,
      });
    }
  );
};
