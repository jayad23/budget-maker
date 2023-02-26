import { redirect } from "react-router-dom"
//libs
import { toast } from "react-toastify";
//helpers
import { deleteItem, cleanStore} from "../helpers";
export const logoutAction = async () => {
  deleteItem({ key: "userName" }); 
  cleanStore(); 
  toast.success("You've successfully delete your account");
  return redirect("/");
};