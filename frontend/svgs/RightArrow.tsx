import * as React from 'react'

interface RightArrowProps {
  colour?: string
  backgroundColour?: string
  hoverColour?: string
  hoverBackgroundColour?: string
}

const LeftArrow: React.FC<RightArrowProps> = ({hoverColour = '#009FE3'}) => {
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <path
        fill="none"
        d="M9 18L15 12L9 6"
        stroke={isHovered ? hoverColour : 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default LeftArrow
