import { toast } from "react-toastify";
import { ErrorHandler, setDataInStorage } from "../helpers";

export const newUser = ({ values }) => {
  try {
    setDataInStorage({ key: "userName", value: values.userName });
    return toast.success(`Welcome, ${values.userName}`);
  } catch (error) {
    toast.error("There was a problem creating your account.");
    ErrorHandler("account");
  };
};