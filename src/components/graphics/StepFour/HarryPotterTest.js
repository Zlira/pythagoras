import React from 'react'

import { LawfullnessInput, GoodnessInput } from './TestInput'

// todo dispatch events for setting lawfullness and 
// goodness to 0 at the start
export default () => {
    return (
      <form>
        <p>Слухняність</p>
        <LawfullnessInput className='lawfullness' />
        <p>Добрість</p>
        <GoodnessInput className='goodness' />
      </form>
    )
}