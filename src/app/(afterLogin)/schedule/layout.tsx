'use client'
import * as React from 'react'
import { CalendarHeader } from '@/components/Header/CalendarHeader'
import { Calendar } from '@/components/ui/calendar'
import { useCalendar } from '@/hooks/useCalendar'
import { usePathname } from 'next/navigation'
import { useProjectInfoQuery } from '@/api'
import { HexColorPicker } from 'react-colorful'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

type ViewType = 'monthly' | 'weekly' | 'list'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { state, handlePrev, handleNext, handleToday } = useCalendar()
  const pathname = usePathname()
  const view = (pathname.split('/').pop() || 'list') as ViewType
  const { data } = useProjectInfoQuery()

  const [colors, setColors] = React.useState<{ [key: string]: string }>({})
  const [tempColor, setTempColor] = React.useState<{ [key: string]: string }>(
    {},
  )
  const [openPopover, setOpenPopover] = React.useState<{
    [key: string]: boolean
  }>({})

  const handleColorChange = (uid: string, newColor: string) => {
    setTempColor((prevColors) => ({
      ...prevColors,
      [uid]: newColor,
    }))
  }

  const handleConfirmColorChange = (uid: string) => {
    setColors((prevColors) => ({
      ...prevColors,
      [uid]: tempColor[uid],
    }))
    setOpenPopover((prev) => ({ ...prev, [uid]: false }))
  }

  const handleCancelColorChange = (uid: string) => {
    setTempColor((prevColors) => ({
      ...prevColors,
      [uid]:
        colors[uid] ||
        data?.result.find((project) => project.uid === uid)?.color ||
        '#aabbcc',
    }))
    setOpenPopover((prev) => ({ ...prev, [uid]: false }))
  }

  const getHandlersForView = (view: ViewType) => {
    switch (view) {
      case 'monthly':
        return {
          onPrev: () => handlePrev('month'),
          onNext: () => handleNext('month'),
        }
      case 'weekly':
        return {
          onPrev: () => handlePrev('week'),
          onNext: () => handleNext('week'),
        }
      case 'list':
      default:
        return {
          onPrev: () => handlePrev('day'),
          onNext: () => handleNext('day'),
        }
    }
  }

  const { onPrev, onNext } = getHandlersForView(view)

  return (
    <div className="m-auto flex w-[1180px]">
      <div className="flex flex-col gap-6">
        <Calendar className="h-[315px] rounded-[8px] border border-gray-300 text-large" />
        <div className="flex flex-col gap-3 p-[10px]">
          <p className="text-body">내 캘린더</p>
          {data?.result.map((project) => (
            <div className="flex items-center gap-2" key={project.uid}>
              <Popover
                open={openPopover[project.uid] || false}
                onOpenChange={(isOpen) =>
                  setOpenPopover((prev) => ({ ...prev, [project.uid]: isOpen }))
                }
              >
                <PopoverTrigger asChild>
                  <Button
                    style={{
                      backgroundColor:
                        tempColor[project.uid] ||
                        colors[project.uid] ||
                        project.color,
                    }}
                    className="h-[14px] w-[14px] rounded-[2px] border border-gray-200 p-0"
                  />
                </PopoverTrigger>
                <PopoverContent className="w-[235px]">
                  <HexColorPicker
                    color={
                      tempColor[project.uid] ||
                      colors[project.uid] ||
                      project.color
                    }
                    onChange={(newColor) =>
                      handleColorChange(project.uid, newColor)
                    }
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <Button
                      onClick={() => handleCancelColorChange(project.uid)}
                    >
                      취소
                    </Button>
                    <Button
                      onClick={() => handleConfirmColorChange(project.uid)}
                    >
                      확인
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <p className="text-small">{project.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">{children}</div>
    </div>
  )
}

export default Layout
