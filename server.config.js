if (process.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}
export const client_id = process.env.CLIENT_ID;
