import * as React from 'react'

interface RightArrowProps {
  hoverColour?: string
  width?: string
  height?: string
  arrowColor?: string
}

const RightArrow: React.FC<RightArrowProps> = ({
  hoverColour = '#009FE3',
  width = '24',
  height = '24',
  arrowColor = 'white',
}) => {
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
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <path
        fill="none"
        d="M9 18L15 12L9 6"
        stroke={isHovered ? hoverColour : arrowColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default RightArrow
