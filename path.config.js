if (process.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

export const registrationRoute =  process.env.BASE_URL + "register";
export const loginRoutes = process.env.BASE_URL +"login";
export const deleteElement = process.env.BASE_URL+"delete";
export const registerViaGoogle = process.env.BASE_URL+"registerGoogle";
export const authenticateUserAndGetData =
process.env.BASE_URL+"authUser";
export const createOrderLink = process.env.BASE_URL+"order";
export const otpGenerator = process.env.OTP_GENERATOR_BASE_URL+"otps";
export const verifyOtp = process.env.OTP_GENERATOR_BASE_URL+"verifyOtp";
export const prevOrderDetails = process.env.BASE_URL+"orders";
export const updateOrderDetails = process.env.BASE_URL+"orders";
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
