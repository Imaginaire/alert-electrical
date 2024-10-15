import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

interface DualRangeSliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  labelPosition?: 'top' | 'bottom'
  label?: (value: number | undefined) => React.ReactNode
}

const DualRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DualRangeSliderProps
>(({className, label, labelPosition = 'top', ...props}, ref) => {
  const initialValue = Array.isArray(props.value) ? props.value : [props.min, props.max]

  return (
    <SliderPrimitive.Root
      ref={ref}
      className="relative flex w-full touch-none select-none items-center"
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {initialValue.map((value, index) => (
        <React.Fragment key={index}>
          <SliderPrimitive.Thumb className="relative block h-4 w-4 rounded-full border-2 border-primary bg-white cursor-pointer bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            {label && (
              <span
                className={`absolute flex w-full justify-center ${labelPosition === 'top' && 'top-[14px]'} ${labelPosition === 'bottom' && 'bottom-4'}
                 `}
              >
                {label(value)}
              </span>
            )}
          </SliderPrimitive.Thumb>
        </React.Fragment>
      ))}
    </SliderPrimitive.Root>
  )
})
DualRangeSlider.displayName = 'DualRangeSlider'

export {DualRangeSlider}
