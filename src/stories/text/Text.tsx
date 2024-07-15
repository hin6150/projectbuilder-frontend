// src/components/Text.tsx
import React from 'react'
import clsx from 'clsx'

interface TextProps {
  className?:
    | 'text-h1'
    | 'text-h2'
    | 'text-h3'
    | 'text-h4'
    | 'text-p'
    | 'text-body'
    | 'text-subtle'
    | 'text-small'
    | 'text-blockquote'
    | 'text-inline-code'
    | 'text-table-head'
    | 'text-table-item'
  fontWeight?:
    | ''
    | 'font-thin'
    | 'font-extralight'
    | 'font-light'
    | 'font-normal'
    | 'font-medium'
    | 'font-semibold'
    | 'font-bold'
    | 'font-extrabold'
    | 'font-black'
  children: string
}

const Text: React.FC<TextProps> = ({ className, children, fontWeight }) => {
  return (
    <p className={clsx('font-pretendard', className, fontWeight)}>{children}</p>
  )
}

export default Text
