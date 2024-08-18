'use client'

import { useState, useEffect } from 'react'
import { GradientPicker } from '../GradientPicker/GradientPicker'
import { Button } from './button'

interface TextGradientGeneratorProps {
  initialColor: string
  onColorChange: (color: string) => void
}

export const TextGradientGenerator: React.FC<TextGradientGeneratorProps> = ({
  initialColor,
  onColorChange,
}) => {
  const [background, setBackground] = useState(initialColor)

  useEffect(() => {
    setBackground(initialColor)
  }, [initialColor])

  const handleColorChange = (color: string) => {
    setBackground(color)
    onColorChange(color)
  }

  return (
    <div>
      <GradientPicker
        background={background}
        setBackground={handleColorChange}
        className="rounded-[2px] p-0"
      />
    </div>
  )
}
