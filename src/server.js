import app from "./routes/routes.js";
import dotenv from "dotenv";

dotenv.config();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
