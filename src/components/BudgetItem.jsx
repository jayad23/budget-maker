import React from 'react'
import { formatCurrency, calculateSpentByBudget, formatPercent } from '../helpers'

const BudgetItem = ({ id, type, color, createdAt, amount }) => {

  const spent = calculateSpentByBudget(id);
  const amt = Number(amount);

  return (
    <div
      className='budget'
      style={{
        "--accent": color
      }}
    >
      <div className="progress-text">
        <h3>{type}</h3>
        <p>{formatCurrency(amt)} Budgeted</p>
      </div>
      <progress max={amt} value={spent}>
        {formatPercent(spent / amt)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amt - spent)} remaining</small>
      </div>
    </div>
  )
}

export default BudgetItem