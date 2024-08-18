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
  const [background, setBackground] = useState('#ff75c3')

  return (
    <div
      className="flex h-[14px] w-[14px] items-center justify-center rounded !bg-cover !bg-center p-10 transition-all"
      style={{ background }}
    >
      <GradientPicker background={background} setBackground={setBackground} />
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
    '#E2E2E2',
    '#FEE2E2',
    '#FFEDD5',
    '#FEF08A',
    '#D9F99D',
    '#CFFAFE',
    '#F3E8FF',
    '#09203f',
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'flex h-[14px] w-[14px]',
            !background && 'text-muted-foreground',
            className,
          )}
          style={{ background }}
        />
      </PopoverTrigger>
      <PopoverContent className="flex w-full flex-col gap-2">
        <div className="flex flex-wrap gap-1">
          {solids.map((s) => (
            <div
              key={s}
              style={{ background: s }}
              className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
              onClick={() => setBackground(s)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
