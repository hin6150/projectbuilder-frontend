import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface AvatarProps {
  imageUrl?: string
  name: string
  width: string
  height: string
}
export function ProfileAvatar({ imageUrl, name, width, height }: AvatarProps) {
  const getFallBackText = (name: string) => {
    // 한글 이름인지 판별하는 정규식
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/

    if (isKorean.test(name)) {
      // 한글 이름일 경우
      const nameLength = name.length
      if (nameLength >= 3) {
        return name.slice(-2)
      }
      return name
    } else {
      // 영어 이름일 경우
      const initials = name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('')
      return initials
    }
  }

  return (
    <Avatar width={width} height={height}>
      {imageUrl ? (
        <AvatarImage src={imageUrl} alt="Avatar Image" />
      ) : (
        <AvatarFallback>{getFallBackText(name)}</AvatarFallback>
      )}
    </Avatar>
  )
}
