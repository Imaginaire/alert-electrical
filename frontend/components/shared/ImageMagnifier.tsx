import {useState} from 'react'

interface ImageMagnifierProps {
  src: string
  width: string
  height: string
  alt: string
  magnifierHeight?: number
  magnifierWidth?: number
  zoomLevel?: number
}

export default function ImageMagnifier({
  src,
  width,
  height,
  alt,
  magnifierHeight = 100,
  magnifierWidth = 100,
  zoomLevel = 1.5,
}: ImageMagnifierProps) {
  const [[x, y], setXY] = useState([0, 0])
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])
  const [showMagnifier, setShowMagnifier] = useState(false)

  const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
    // update image size and turn-on magnifier
    const elem = e.currentTarget
    const {width, height} = elem.getBoundingClientRect()
    setSize([width, height])
    setShowMagnifier(true)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    // update cursor position
    const elem = e.currentTarget
    const {top, left} = elem.getBoundingClientRect()

    // calculate cursor position on the image
    const x = e.pageX - left - window.pageXOffset
    const y = e.pageY - top - window.pageYOffset
    setXY([x, y])
  }

  return (
    <div className={`imageMagnifier relative ${width} ${height} aspect-square`}>
      <img
        src={src}
        className="w-full h-full object-cover"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          // close magnifier
          setShowMagnifier(false)
        }}
        alt={alt || 'image'}
      />

      <div
        style={{
          display: showMagnifier ? '' : 'none',
          position: 'absolute',

          // prevent magnifier blocks the mousemove event of img
          pointerEvents: 'none',
          // set size of magnifier
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          // move element center to cursor pos
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          opacity: '1', // reduce opacity so you can verify position
          border: '1px solid lightgray',
          backgroundColor: 'white',
          backgroundImage: `url('${src}')`,
          backgroundRepeat: 'no-repeat',

          //calculate zoomed image size
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,

          //calculate position of zoomed image.
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      ></div>
    </div>
  )
}
