import { toast } from "react-toastify";
import {
  ErrorHandler,
  fetchDataFromStorage,
  setDataInStorage,
} from "../helpers";

export const createExpense = ({ values }) => {
  const existingExpenses = fetchDataFromStorage("expenses") ?? [];
    const [budgetId, budgetType] = values.selectBudget.split("/");

    const expense = {
      id: crypto.randomUUID(),
      type: values.newExpense,
      amount: values.amount,
      createdAt: Date.now(),
      budgetId,
      budgetType
    };

    if (existingExpenses.length > 0) {
      const exists = existingExpenses.find(xps => xps.type === expense.type);
      const random = Math.floor(Math.random() * existingExpenses.length);
      if (exists) {
        return toast.warning(`That expense is budgeted. You can use ${exists.type}-${random}`);
      }
    }
    try {
      setDataInStorage({ key: "expenses", value: [...existingExpenses, expense] });
      return toast.success("New expense added in.")
    } catch (error) {
      ErrorHandler("expense")
    }
};
