import * as React from 'react'

interface ArrowButtonProps {
  circleColour?: string
  arrowColour?: string
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  circleColour = '#009FE3',
  arrowColour = '#fff',
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} fill="none">
    <circle cx={30} cy={30} r={30} fill={circleColour} />
    <path
      fill={arrowColour}
      d="M38.142 23a1 1 0 0 0-1-1h-9a1 1 0 0 0 0 2h8v8a1 1 0 0 0 2 0v-9ZM23.707 37.85 37.85 23.706l-1.414-1.414-14.142 14.142 1.414 1.414Z"
    />
  </svg>
)
export default ArrowButton
