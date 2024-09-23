import {AvailabilityType} from '@/types'
import {groupConsecutiveDays} from '../utils/groupConsecutiveDays'

interface AvailabilityProps {
  availability: AvailabilityType
}

export default function Availability(props: AvailabilityProps) {
  const {availability} = props

  // Group consecutive days with the same available times
  const groupedDays = groupConsecutiveDays(availability)

  return (
    availability && (
      <div className="font-manrope font-light mt-5">
        <table className="table-auto">
          <tbody>
            {groupedDays.map((group, index) => {
              return (
                <tr key={index}>
                  <td className="pr-10 sm:pr-24 py-2 whitespace-nowrap">
                    {group.startDay}
                    {group.endDay ? ` to ${group.endDay}` : ''}
                  </td>
                  <td className="py-2">
                    {group.times.length > 0
                      ? group.times.map((time) => `${time.from} - ${time.to}`).join(', ')
                      : 'Closed'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  )
}
