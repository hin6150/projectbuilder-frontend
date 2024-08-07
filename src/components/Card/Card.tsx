import { ProjectInfo } from '@/api'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useModal } from '@/hooks/useModal'
import { ModalTypes } from '@/hooks/useModal/useModal'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import {
  MoreVertical,
  PencilIcon,
  Trash2Icon,
  UserPlusIcon,
} from 'lucide-react'
import Link from 'next/link'
import { ProfileAvatar } from '../Avatar/Avatar'

const MAX_VISIBLE_MEMBERS = 5

// Card.tsx
const Card = ({
  data,
  setSelectedProject,
}: {
  data: ProjectInfo
  setSelectedProject: any
}) => {
  const visibleMembers = data.users?.slice(0, MAX_VISIBLE_MEMBERS)
  const remainingMemberCount = data.users?.length - MAX_VISIBLE_MEMBERS

  const { openModal } = useModal()

  const date = parseISO(data.startDate)

  return (
    <Link href={`/project/${data.id}`}>
      <div className="flex w-[380px] flex-col gap-14 rounded-xl border-2 border-slate-200 p-6 shadow-base">
        <div className="flex flex-col gap-4">
          <p className="text-h3">{data.title}</p>
          <p className="text-body">{data.overview}</p>
          <p className="text-inline-code text-gray-400">
            {format(data.startDate, 'yy.MM.dd (EEE)', { locale: ko })} ~
            {format(data.endDate, 'yy.MM.dd (EEE)', { locale: ko })}
          </p>
        </div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-[6px]">
            <div className="flex -space-x-3">
              {visibleMembers.map((member, index) => (
                <ProfileAvatar
                  key={index}
                  size="32"
                  imageUrl={member.avatar}
                  name={member.name}
                />
              ))}
            </div>
            {remainingMemberCount > 0 && (
              <p className="text-small text-gray-400">
                +{remainingMemberCount}
              </p>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical
                name="more-vertical"
                className="cursor-pointer text-slate-500"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[184px]"
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <DropdownMenuItem
                onClick={() => {
                  setSelectedProject(data)
                  openModal('dimed', ModalTypes.INVITE)
                }}
              >
                <div className="flex items-center gap-2 p-2">
                  <UserPlusIcon size={16} />
                  <p className="text-subtle font-medium">팀원 초대</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedProject(data)
                  openModal('dimed', ModalTypes.EDIT)
                }}
              >
                <div className="flex items-center gap-2 p-2">
                  <PencilIcon size={16} />
                  <p className="text-subtle font-medium">프로젝트 수정</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedProject(data)
                  openModal('dimed', ModalTypes.DELETE)
                }}
              >
                <div className="flex items-center gap-2 p-2">
                  <Trash2Icon size={16} />
                  <p className="text-subtle font-medium">프로젝트 삭제</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Link>
  )
}

export default Card
