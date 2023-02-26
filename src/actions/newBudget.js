import { toast } from "react-toastify";
import { ErrorHandler, fetchDataFromStorage, generateRandomColor, setDataInStorage } from "../helpers";

export const newBudget = ({ values }) => {
  const existingBudgets = fetchDataFromStorage("budgets") ?? [];
  const budget = {
    id: crypto.randomUUID(),
    type: values.newBudget,
    amount: values.amount,
    createdAt: Date.now(),
    color: generateRandomColor(existingBudgets.length),
  };
  if (existingBudgets.length > 0) {
    const exists = existingBudgets.find((bdg) => bdg.type === budget.type);
    const random = Math.floor(Math.random() * existingBudgets.length);
    if (exists) {
      return toast.warning(
        `The name is taken. You can use ${exists.type}-${random}`,
      );
    }
  }
  try {
    setDataInStorage({ key: "budgets", value: [...existingBudgets, budget] });
    return toast.success("New budget added in.");
  } catch (error) {
    ErrorHandler("budget");
  }
};
