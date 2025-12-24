import { useState, useEffect } from 'react'

const StatCounter = ({ endValue, duration = 2000 }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = parseInt(endValue)
    if (start === end) return

    let totalMilSecDur = duration
    let incrementTime = (totalMilSecDur / end) * 1000

    let timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, incrementTime)

    return () => clearInterval(timer)
  }, [endValue, duration])

  return (
    <div className="text-3xl font-bold">
      {count}
      {endValue.includes('+') && '+'}
      {endValue.includes('%') && '%'}
    </div>
  )
}

export default StatCounter