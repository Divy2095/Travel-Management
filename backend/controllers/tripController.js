const { CloudinaryUpload } = require("../utils/Cloudinary");

exports.createTrip = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const file = req.files?.image; // from frontend's 'image' field

    if (!file) return res.status(400).json({ message: "No image uploaded" });

    const cloudResult = await CloudinaryUpload(file, "gotravel/trips");

    const newTrip = {
      title,
      description,
      date,
      imageUrl: cloudResult.secure_url,
    };

    // Save newTrip to your DB (Mongo or MySQL)

    res.status(201).json({ message: "Trip added", trip: newTrip });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
