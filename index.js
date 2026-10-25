// Example JSON endpoint
const port = process.env.PORT || 4000; // Use the PORT from .env or default to 4000
import app from "./app.js";
import connectDB from "./database/db.js";

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  connectDB();
});




// mongodb+srv://<db_username>:<db_password>@cluster0.laoibtz.mongodb.net/?appName=Cluster0