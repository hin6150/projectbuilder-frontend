'use client'

import * as React from 'react'
import { Clock } from 'lucide-react'
import { TimePickerInput } from './time-picker-input'

interface TimePickerDemoProps {
  startDate: Date | undefined
  setStartDate: (date: Date | undefined) => void
  endDate: Date | undefined
  setEndDate: (date: Date | undefined) => void
}

export function TimePickerDemo({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: TimePickerDemoProps) {
  const minuteRef1 = React.useRef<HTMLInputElement>(null)
  const hourRef1 = React.useRef<HTMLInputElement>(null)
  const secondRef1 = React.useRef<HTMLInputElement>(null)
  const minuteRef2 = React.useRef<HTMLInputElement>(null)
  const hourRef2 = React.useRef<HTMLInputElement>(null)
  const secondRef2 = React.useRef<HTMLInputElement>(null)

  return (
    <div>
      <div className="flex items-center justify-center gap-2">
        <div className="grid gap-1 text-center">
          <TimePickerInput
            picker="hours"
            date={startDate}
            setDate={setStartDate}
            ref={hourRef1}
            onRightFocus={() => minuteRef1.current?.focus()}
          />
        </div>
        <p className="mt-2">:</p>
        <div className="grid gap-1 text-center">
          <TimePickerInput
            picker="minutes"
            date={startDate}
            setDate={setStartDate}
            ref={minuteRef1}
            onLeftFocus={() => hourRef1.current?.focus()}
            onRightFocus={() => secondRef1.current?.focus()}
          />
        </div>

        <div className="flex h-10 items-center">
          <Clock className="ml-2 h-4 w-4" />
        </div>
      </div>
      <p className="text-center">~</p>
      <div className="mt-1 flex items-center justify-center gap-2">
        <div className="grid gap-1 text-center">
          <TimePickerInput
            picker="hours"
            date={endDate}
            setDate={setEndDate}
            ref={hourRef2}
            onRightFocus={() => minuteRef2.current?.focus()}
          />
        </div>
        <p className="mt-2">:</p>
        <div className="grid gap-1 text-center">
          <TimePickerInput
            picker="minutes"
            date={endDate}
            setDate={setEndDate}
            ref={minuteRef2}
            onLeftFocus={() => hourRef2.current?.focus()}
            onRightFocus={() => secondRef2.current?.focus()}
          />
        </div>

        <div className="flex h-10 items-center">
          <Clock className="ml-2 h-4 w-4" />
        </div>
      </div>
    </div>
  )
}
