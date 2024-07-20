import { HTMLAttributes } from 'react'

import { IconNames, Icons } from './Icons'

export type IconProps = {
  name: IconNames
} & HTMLAttributes<HTMLDivElement>

export const Icon = ({ name = 'github', ...props }: IconProps) => {
  const IconComponent = Icons[name]
  return <div {...props}>{IconComponent}</div>
}
