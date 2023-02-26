import { UserPlusIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useFetcher } from 'react-router-dom'
import illustration from "../assets/illustration.jpg";
import { SubmitButton } from './Btn';

const Intro = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  return (
    <div className='intro'>
      <div>
        <h1>
          Take control of <span className='accent'>Your Money</span>
        </h1>
        <p>
          Personal budget is the secret to financial freedom.
          Start your journey today.
        </p>
        <fetcher.Form method='post'>
          <input
            type="text"
            name="userName"
            required
            placeholder="What's your name?"
            aria-label='Your name'
            autoComplete='given-name'
          />
          <input type="hidden" name="_action" value="newUser" />
          <SubmitButton
            msn="Create Account"
            Icon={UserPlusIcon}
            loading={isSubmitting}
          />
        </fetcher.Form>
      </div>
      <img src={illustration} alt="home-logo" />
    </div>
  )
}

export default Intro