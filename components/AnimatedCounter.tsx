'use client';

import CountUp from 'react-countup';

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <span className="tnum">
      <CountUp
        decimals={2}
        decimal="."
        prefix="$"
        duration={1}
        end={amount}
      />
    </span>
  )
}

export default AnimatedCounter
