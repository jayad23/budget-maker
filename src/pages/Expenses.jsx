import React from 'react'
import { Link, useLoaderData } from 'react-router-dom';
import { fetchDataFromStorage, waait } from '../helpers'
import Table from '../components/Table';
import { deleteExpense } from '../actions/deleteExpense';
import { HomeIcon } from '@heroicons/react/24/solid';

export const expensesLoader = () => {
  const expenses = fetchDataFromStorage("expenses");
  return { expenses };
}

export const expensesAction = async ({ request }) => {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") return deleteExpense({ values })
}

const Expenses = () => {
  const { expenses } = useLoaderData();
  const areExpensesToShow = expenses && expenses.length > 0;
  return (
    <div className="grid-lg">
      <h1>All Expenses: </h1>
      {
        areExpensesToShow ? (
          <div className='grid-md'>
            <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)} />
          </div>
        ) : (
          <div className='flex-md'>
            <div>
              <p style={{ marginBottom: "10px" }}>There are no expenses to show!</p>
              <Link
                to="/"
                className='btn btn--dark'
              >
                <HomeIcon width={20} />
                <span>Go Home</span>
              </Link>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Expenses