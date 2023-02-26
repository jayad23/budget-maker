import React from 'react'
import { Form, NavLink } from 'react-router-dom';
//assets
import logoMark from "../assets/logomark.svg";
//libs
import { TrashIcon } from "@heroicons/react/24/solid"

const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to Home">
        <img src={logoMark} alt="logo-mark" height={30} />
        <span>HomeBudget</span>
      </NavLink>
      {
        userName && (
          <Form
            method="post"
            action="/logout"
            onSubmit={(e) => {
              if (!confirm("Delete user and all data?")) {
                e.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn btn--warning">
              <TrashIcon width={30} />
              <span>Delete User</span>
            </button>
          </Form>
        )
      }
    </nav>
  )
}

export default Nav