import { toast } from "react-toastify";
import {
  deleteItem,
  ErrorHandler,
  fetchDataFromStorage,
  setDataInStorage,
} from "../helpers";

export const deleteExpense = ({ values }) => {
  const existingExpenses = fetchDataFromStorage("expenses");
  const leftIn = existingExpenses.filter(
    (item) => item.id !== values.expenseId,
  );
  try {
    if (leftIn.length === 0) {
      deleteItem({ key: "expenses" });
      return toast.warning("No expenses registered.");
    } else {
      setDataInStorage({ key: "expenses", value: leftIn });
      return toast.success("Expense deleted.");
    }
  } catch (error) {
    ErrorHandler(`Expense: ${values.expenseId}`);
  }
};
