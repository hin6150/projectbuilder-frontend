import React from 'react'
import optionStyles from './Option.css'

interface OptionProps {
  onInvite: () => void
  onEdit: () => void
  onDelete: () => void
  optionRef: React.RefObject<HTMLDivElement>
}

const Option: React.FC<OptionProps> = ({
  onInvite,
  onEdit,
  onDelete,
  optionRef,
}) => {
  return (
    <div className={optionStyles.optionMenu} ref={optionRef}>
      <div className={optionStyles.optionItem} onClick={onInvite}>
        <img src="/user-plus.png" alt="invite" />
        <span>팀원 초대</span>
      </div>
      <div className={optionStyles.optionItem} onClick={onEdit}>
        <img src="/pencil.png" alt="edit" />
        <span>프로젝트 수정</span>
      </div>
      <div className={optionStyles.optionItem} onClick={onDelete}>
        <img src="/trash-2.png" alt="delete" />
        <span>프로젝트 삭제</span>
      </div>
    </div>
  )
}

export default Option
