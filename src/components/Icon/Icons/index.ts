import { snsIcons, otherIcons } from './SNS'

export type IconNames = keyof typeof snsIcons | keyof typeof otherIcons

export const Icons: {
  [key in IconNames]: JSX.Element
} = {
  ...snsIcons,
  ...otherIcons,
}

export const iconNames = Object.keys(Icons) as IconNames[]
