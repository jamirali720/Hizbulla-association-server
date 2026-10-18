// Example JSON endpoint
const port = process.env.PORT || 4000; // Use the PORT from .env or default to 4000
const app = require("./app");
const connectDB = require("./database/db");

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  connectDB();
});




// mongodb+srv://<db_username>:<db_password>@cluster0.laoibtz.mongodb.net/?appName=Cluster0