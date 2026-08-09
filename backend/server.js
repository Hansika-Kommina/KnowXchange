require("dotenv").config();
const mongoose = require("mongoose");
const dns = require("dns");

dns.resolveSrv("_mongodb._tcp.cluster0.b0aymjy.mongodb.net", (err, addresses) => {
  console.log("DNS Error:", err);
  console.log("DNS Addresses:", addresses);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB Error:", err));