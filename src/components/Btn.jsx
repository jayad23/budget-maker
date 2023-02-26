import { Orbit } from '@uiball/loaders';
import { TrashIcon } from '@heroicons/react/24/solid';
import React, { Fragment } from 'react'

export const SubmitButton = ({ msn, Icon, loading }) => {
  return (
    <button type="submit" className='btn btn--dark'>
      {
        loading ? (
          <Fragment>
            <span>Creating...{" "}</span>
            <Orbit size={20} color="#f8f4f5" />
          </Fragment>
        ) : (
          <Fragment>
            <span>{msn}</span>
            <Icon width={30} />
          </Fragment>
        )
      }
    </button>
  )
};

export const DeleteButton = ({ loading, id }) => {
  return (
    <button type="submit" className='btn btn--warning' aria-label={`Delete ${id}`}>
      {
        loading ? (
          <Orbit size={20} color="#232122" />
        ) : (
          <TrashIcon width={20} />
        )
      }
    </button>
  )
};