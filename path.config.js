if(process.env.NODE_ENV!=="PRODUCTION"){
  require("dotenv").config()
}


export const registrationRoute = process.env.REGISTRATION_ROUTE;
export const loginRoutes = process.env.LOGINS_ROUTES;
export const deleteElement = process.env.DELETE_ELEMENT;
export const registerViaGoogle = process.env.REGISTER_VIA_GOOGLE;
export const authenticateUserAndGetData =
  process.env.AUTHENTICATE_USER_AND_GET_DATA;
export const createOrderLink = process.env.CREATE_ORDER_LINK;
export const otpGenerator = process.env.OTP_GENERATOR;
export const verifyOtp = process.env.VERIFY_OTP;
export const prevOrderDetails = process.env.PREV_ORDER_DETAILS;
console.log(
  "registrationRoute---",
  registrationRoute,
  loginRoutes,
  deleteElement,
  authenticateUserAndGetData,
  registerViaGoogle,
  otpGenerator,
  createOrderLink,
  prevOrderDetails
);
