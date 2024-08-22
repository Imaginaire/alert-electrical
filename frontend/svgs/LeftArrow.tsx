import * as React from 'react'

interface LeftArrowProps {
  colour?: string
  backgroundColour?: string
  hoverColour?: string
  hoverBackgroundColour?: string
}

const LeftArrow: React.FC<LeftArrowProps> = ({hoverColour = '#009FE3'}) => {
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
        d="M15 6L9 12L15 18"
        stroke={isHovered ? hoverColour : 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default LeftArrow
