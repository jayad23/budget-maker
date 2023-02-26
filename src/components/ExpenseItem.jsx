import React from 'react'
import { Link, useFetcher } from 'react-router-dom';
import { getAllMatchingItems } from '../helpers';
import { DeleteButton } from './Btn';

const ExpenseItem = ({ type, id, amount, createdAt, budgetId, budgetType, showBudgetBtn }) => {
  const date = new Date(createdAt).toLocaleDateString();
  const matchingBudget = getAllMatchingItems({
    category: "budgets",
    key: "type",
    value: budgetType.trim()
  })[0];

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  return (
    <tr>
      <th className='capt'>{type}</th>
      <th>{amount}</th>
      <th>{date}</th>
      {
        showBudgetBtn && (
          <th>
            <Link
              to={`/budget/${matchingBudget?.id}`}
              style={{
                "--accent": matchingBudget?.color
              }}
            >
              {budgetType}
            </Link>
          </th>
        )
      }
      <th>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={id} />
          <DeleteButton loading={isSubmitting} id={id} />
        </fetcher.Form>
      </th>
    </tr>
  )
}

export default ExpenseItem