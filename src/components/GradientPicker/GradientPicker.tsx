'use client'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export function PickerExample() {
  const [background, setBackground] = useState('bg-blue-900') // 기본 색상을 Tailwind 클래스로 설정

  return (
    <div className="flex h-[14px] w-[14px] items-center justify-center rounded !bg-cover !bg-center p-10 transition-all">
      <GradientPicker background={background} setBackground={setBackground} />
      <Button
        variant={'outline'}
        className={cn('flex h-[14px] w-[14px] rounded', background)}
      >
        Button
      </Button>
    </div>
  )
}

export function GradientPicker({
  background,
  setBackground,
  className,
}: {
  background: string
  setBackground: (background: string) => void
  className?: string
}) {
  const solids = [
    'bg-slate-200', // '#E2E2E2'
    'bg-red-100', // '#FEE2E2'
    'bg-orange-100', // '#FFEDD5'
    'bg-yellow-200', // '#FEF08A'
    'bg-lime-100', // '#D9F99D'
    'bg-cyan-100', // '#CFFAFE'
    'bg-purple-100', // '#F3E8FF'
    'bg-blue-900', // '#09203f'
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('flex h-[14px] w-[14px]', className, background)}
        />
      </PopoverTrigger>
      <PopoverContent className="flex w-full flex-col gap-2">
        <div className="flex flex-wrap gap-1">
          {solids.map((s) => (
            <div
              key={s}
              className={`h-6 w-6 cursor-pointer rounded-md ${s} active:scale-105`}
              onClick={() => setBackground(s)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
