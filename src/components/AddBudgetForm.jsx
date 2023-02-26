import { CurrencyEuroIcon } from '@heroicons/react/24/solid'
import React, { useRef, useEffect } from 'react'
import { useFetcher } from 'react-router-dom'
import { SubmitButton } from './Btn'

const AddBudgetForm = () => {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting";

  const formref = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formref.current.reset();
      inputRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Create budget
      </h2>
      <fetcher.Form
        method="post"
        className='grid-sm'
        ref={formref}
      >
        <div className="grid-xs">
          <label htmlFor='newBudget'>New Budget</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="E.g. Groceries"
            required
            ref={inputRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor='amount'>Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="E.g. €350"
            required
            inputMode="decimal"
          />
        </div>
        <input type="hidden" name="_action" value="newBudget" />
        <SubmitButton
          msn="Create Budget"
          Icon={CurrencyEuroIcon}
          loading={isSubmitting}
        />
      </fetcher.Form>
    </div>
  )
}

export default AddBudgetForm