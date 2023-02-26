import React, { Fragment } from 'react'
import { Link, useLoaderData } from 'react-router-dom';

//helpers
import {
  fetchDataFromStorage,
  waait,
} from '../helpers'
import { deleteExpense } from '../actions/deleteExpense';
//components

import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';

//libs
import { createExpense } from '../actions/createExpense';
import { newUser } from '../actions/newUser';
import { newBudget } from '../actions/newBudget';
export const dashboardLoader = () => {
  const userName = fetchDataFromStorage("userName");
  const budgets = fetchDataFromStorage("budgets");
  const expenses = fetchDataFromStorage("expenses");
  return {
    userName,
    budgets,
    expenses
  }
}

export const dashboardAction = async ({ request }) => {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "newUser") return newUser({ values });

  if (_action === "newBudget") return newBudget({ values });

  if (_action === "createExpense") return createExpense({ values });

  if (_action === "deleteExpense") return deleteExpense({ values });
};

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData()
  const areBudgtes = budgets && budgets.length > 0;

  return (
    <Fragment>
      {
        userName ? (
          <div className="dashboard">
            <h1>
              Welcome back,
              <span className="accent">
                {" "}
                {userName}
              </span>
            </h1>
            <div className="grid-sm">
              {
                areBudgtes ? (
                  <div className="grid-lg">
                    <div className="flex-lg">
                      <AddBudgetForm />
                      <AddExpenseForm budgets={budgets} />
                    </div>
                    <h2>Existin Budgets: </h2>
                    <div className="budgets">
                      {
                        budgets.map(budget => (
                          <BudgetItem key={budget.id} {...budget} />
                        ))
                      }
                    </div>
                    {
                      expenses && expenses.length > 0 && (
                        <div className="grid-md">
                          <h2>Recent expenses</h2>
                          <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)} />
                        </div>
                      )
                    }
                    {
                      expenses && expenses.length > 0 && (
                        <Link
                          to="/expenses-detail"
                          className='btn btn--dark'
                        >
                          View all Expenses
                        </Link>
                      )
                    }
                  </div>
                ) : (
                  <div className="grid-sm">
                    <p>Personal budgeting is the secret to financial freedom.</p>
                    <p>Create a budget to get started!</p>
                    <AddBudgetForm />
                  </div>
                )
              }
            </div>
          </div>
        ) : (
          <Intro />
        )
      }
    </Fragment>
  )
}

export default Dashboard