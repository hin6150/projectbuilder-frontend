export const weekClass =
  'flex justify-between items-center flex-[1_0_0] self-stretch'
export const yoilClass =
  'flex h-12 flex-[1_0_0] basis-0 items-center justify-center gap-[10px] text-large'
export const dayClass =
  'flex items-start gap-[10px] flex-[1_0_0] self-stretch border-b border-l border-gray-200 text-large'

const colorVariants: Record<string, { bg: string; border: string }> = {
  'bg-slate-100': { bg: 'bg-slate-500', border: 'border-slate-300' },
  'bg-red-100': { bg: 'bg-red-500', border: 'border-red-300' },
  'bg-orange-100': { bg: 'bg-orange-500', border: 'border-orange-300' },
  'bg-yellow-100': { bg: 'bg-yellow-500', border: 'border-yellow-300' },
  'bg-lime-100': { bg: 'bg-lime-500', border: 'border-lime-300' },
  'bg-cyan-100': { bg: 'bg-cyan-500', border: 'border-cyan-300' },
  'bg-blue-100': { bg: 'bg-blue-500', border: 'border-blue-300' },
  'bg-purple-100': { bg: 'bg-purple-500', border: 'border-purple-300' },
}

export const getDotColor = (color: string): string => {
  return colorVariants[color]?.bg || 'bg-gray-500'
}

export const getBorderColor = (color: string): string => {
  return colorVariants[color]?.border || 'border-gray-300'
}
