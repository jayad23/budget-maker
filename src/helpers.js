import { toast } from "react-toastify";

export const waait = () => new Promise(res => setTimeout(res, Math.random() * 3000));
export const fetchDataFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setDataInStorage = ({ key, value }) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
}

export const cleanStore = () => {
  return localStorage.clear();
}
export const ErrorHandler = (msn) => {
  throw new Error(`There was a problem creating a new ${msn}.`);
}

export const generateRandomColor = (length) => {
  return `${length * 34} 65% 50%`;
}

export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {style:"currency", currency:"EUR"});
};

export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchDataFromStorage("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, exp) => {
    if(exp.budgetId !== budgetId) return acc;
    return Number(acc) + Number(exp.amount);
  }, 0)

  return budgetSpent;
};

export const formatPercent = (amt) => {
  return amt.toLocaleString(undefined, {style:"percent", minimumFractionDigits: 0})
}

export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchDataFromStorage(category) ?? [];

  return data.filter(item => item[key] === value);
}