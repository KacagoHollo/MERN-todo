import React from 'react'
import { useCounter } from '../CounterProvider'

export const NumberPresenter = () => {
    const {value} = useCounter()
  return (
    <div>
        <p>Value from parameter: {value}</p>
    </div>
  )
}
