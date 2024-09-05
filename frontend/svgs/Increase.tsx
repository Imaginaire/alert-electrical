import * as React from 'react'

const Increase: React.FC<React.SVGProps<SVGSVGElement>> = ({width = 16, height = 16}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={width} height={height}>
    <path d="M248 72l0-24-48 0 0 24 0 160L40 232l-24 0 0 48 24 0 160 0 0 160 0 24 48 0 0-24 0-160 160 0 24 0 0-48-24 0-160 0 0-160z" />
  </svg>
)

export default Increase
