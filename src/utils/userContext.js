import { createContext } from "react";

const UserContext = createContext({
  user: { firstName: "Name", email: "Email" },
  frusser: { chrome1: "true", frome1: "false" },
});

export default UserContext;
