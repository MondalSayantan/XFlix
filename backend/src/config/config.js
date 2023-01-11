const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  port: 8083,
  mongoose: {
    url: "mongodb+srv://rahul:test123@xflix.waew9.mongodb.net/xflix?retryWrites=true&w=majority",
  },
};
