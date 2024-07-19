import { snsIcons } from './SNS'

export type IconNames = keyof typeof snsIcons

export const Icons: {
  [key in IconNames]: JSX.Element
} = {
  ...snsIcons,
}

export const iconNames = Object.keys(Icons) as IconNames[]
