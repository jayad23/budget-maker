import { PlusSmallIcon } from '@heroicons/react/24/solid';
import React, { useRef } from 'react'
import { useFetcher } from 'react-router-dom'
import { SubmitButton } from './Btn';

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef();
  return (
    <div className='form-wrapper'>
      <h2 className='h3'>
        Add New
        <span className="accent">
          {" "}
          {
            budgets.length === 1 && `${budgets.map((bdg) => (
              bdg.type
            ))
            }`
          }
        </span>
        {" "} Expense
      </h2>
      <fetcher.Form
        method="post"
        className='grid-sm'
        ref={formRef}
      >
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder='E.g. For Coffee...'
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="addamount">Amount</label>
            <input
              type="number"
              name="amount"
              id="addamount"
              step="0.01"
              placeholder='E.g. $12.40'
              inputMode="decimal"
              required
            />
          </div>
          <div className="grid-xs" hidden={budgets.length <= 1}>
            <label htmlFor="selectBudget">Category</label>
            <select
              type="number"
              name="selectBudget"
              id="selectBudget"
              required
            >
              <option disabled>Select Budget</option>
              {
                budgets.sort((a, b) => (a.createdAt - b.createdAt)).map((budget) => (
                  <option key={budget.id} value={`${budget.id}/${budget.type}`}>{budget.type}</option>
                ))
              }
            </select>
          </div>
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        <SubmitButton
          msn="Add in"
          Icon={PlusSmallIcon}
          loading={isSubmitting}
        />
      </fetcher.Form>
    </div>
  )
}

export default AddExpenseForm