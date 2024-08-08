import { CalendarHeader } from '@/components/Header/CalendarHeader'
import Header from '@/components/Header/Header'
import { useCalendar } from '@/hooks/useCalendar'
import { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  // const { state, handlePrev, handleNext, handleToday } = useCalendar()

  return (
    <div className="m-auto h-screen w-[1180px]">
      {/* <CalendarHeader
        view="month"
        date={state.date}
        onPrev={() => handlePrev('month')}
        onNext={() => handleNext('month')}
        onToday={handleToday}
      /> */}
      {children}
    </div>
  )
}

export default layout
