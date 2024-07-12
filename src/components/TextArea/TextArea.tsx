'use client'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

interface TextareaWithTextProps {
  label: string
  maxLength?: number
}

export function TextareaWithText({
  label,
  maxLength = 100,
}: TextareaWithTextProps) {
  const [text, setText] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  return (
    <div className="grid w-full gap-1.5 text-black font-Pretendard">
      <Label htmlFor="message-2" className="text-base">
        {label}
      </Label>
      <Textarea
        id="message-2"
        placeholder={label}
        value={text}
        onChange={handleChange}
        className="placeholder:text-gray-400 border border-gray-300"
      />
      <p className="text-sm text-muted-foreground text-right font-normal leading-5">
        <span className="text-black">{text.length}</span>
        <span className="text-gray-400">/{maxLength}</span>
      </p>
    </div>
  )
}
