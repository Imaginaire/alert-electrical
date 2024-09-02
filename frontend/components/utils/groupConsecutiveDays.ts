import {TextImage as TextImageType} from '@/types'

type TimeSlot = {from?: string; to?: string}

type GroupedAvailability = {
  startDay: string
  endDay?: string
  times: TimeSlot[]
}

const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export function groupConsecutiveDays(
  availability: TextImageType['availability'],
): GroupedAvailability[] {
  const availabilityMap = new Map(
    (availability || []).map((item) => [item.day, item.availableTimes]),
  )

  const groupedAvailability = allDays.map((day) => ({
    day,
    times: availabilityMap.get(day) || [],
  }))

  const result: GroupedAvailability[] = []
  if (groupedAvailability.length === 0) return result

  let currentGroup: GroupedAvailability = {
    startDay: groupedAvailability[0].day,
    times: groupedAvailability[0].times,
  }

  for (let i = 1; i < groupedAvailability.length; i++) {
    const currentDay = groupedAvailability[i]
    if (currentGroup.times.length === 0 && currentDay.times.length > 0) {
      result.push(currentGroup)
      currentGroup = {
        startDay: currentDay.day,
        times: currentDay.times,
      }
    } else if (
      currentGroup.times.length > 0 &&
      currentGroup.times.length === currentDay.times.length &&
      currentGroup.times.every(
        (time, index) =>
          time.from === currentDay.times[index]?.from && time.to === currentDay.times[index]?.to,
      )
    ) {
      currentGroup.endDay = currentDay.day
    } else {
      result.push(currentGroup)
      currentGroup = {
        startDay: currentDay.day,
        times: currentDay.times,
      }
    }
  }
  result.push(currentGroup)
  return result
}
