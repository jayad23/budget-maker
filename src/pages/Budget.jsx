import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { createExpense } from '../actions/createExpense';
import { deleteExpense } from '../actions/deleteExpense';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';
import { getAllMatchingItems } from '../helpers'

export const budgetAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") return deleteExpense({ values });

  if (_action === "createExpense") return createExpense({ values });
}

export const budgedLoader = async ({ params }) => {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you're trying to access doesn't exist.")
  }
  return { budget, expenses };
}

const Budget = () => {
  const { budget, expenses } = useLoaderData();

  return (
    <div
      className='grid-lg'
      style={{
        "--accent": budget.color
      }}
    >
      <h1 className='h2'>
        <span className='accent'>{budget.type}</span>
        {" "} Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem {...budget} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {
        expenses && expenses.length > 0 && (
          <div className="grid-md">
            <h2>
              <span className="accent">{budget.type}</span>
              {" "}Expenses:
            </h2>
            <Table expenses={expenses} showBudgetBtn={false} />
          </div>
        )
      }
    </div>
  )
}

export default Budget