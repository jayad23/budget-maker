import React from 'react';
import ExpenseItem from './ExpenseItem';

const Table = ({ expenses, showBudgetBtn = true }) => {

  return (
    <div className='table'>
      <table>
        <thead>
          <tr>
            {
              ["Name", "Amount", "Date", showBudgetBtn ? "Budget" : "", ""].map((item, index) => (
                <th key={index}>{item}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            expenses.map(expense => (
              <ExpenseItem key={expense.id} {...expense} showBudgetBtn={showBudgetBtn} />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table