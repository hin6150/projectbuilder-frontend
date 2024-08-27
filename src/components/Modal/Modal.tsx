import { useModal } from '@/hooks/useModal'
import { createPortal } from 'react-dom'

const ModalMain = ({ children }: { children: React.ReactNode }) => {
  const { modals, closeModal, closing } = useModal()

  if (!modals.dimed.open) {
    return null
  }

  const modalPortal = document.querySelector('#modal') as HTMLDivElement

  const clickBackdrop = () => {
    closeModal('dimed')
  }

  return createPortal(
    <div
      id="modal-backdrop"
      className={`${closing.dimed ? 'animate-fade-out' : 'animate-fade-in'} fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50`}
      onClick={clickBackdrop}
    >
      <div
        className={`${closing.dimed ? 'animate-disappear-bottom' : 'animate-appear-up'} flex h-fit w-fit min-w-[410px] flex-col items-center justify-center gap-6 rounded-lg bg-white p-8`}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {children}
      </div>
    </div>,
    modalPortal,
  )
}

const ScheduleModalMain = ({ children }: { children: React.ReactNode }) => {
  const { modals, closing } = useModal()

  if (!modals.default.open) {
    return null
  }

  const modalPortal = document.querySelector('#scheduleModal') as HTMLDivElement

  return createPortal(
    <div className="fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center">
      <div
        className={`${closing.default ? 'animate-disappear-bottom' : 'animate-appear-up'} flex h-fit w-fit min-w-[410px] flex-col items-center justify-center gap-6 rounded-lg bg-white p-8 shadow-2xl`}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {children}
      </div>
    </div>,
    modalPortal,
  )
}

export const Modal = Object.assign(ModalMain, {})
export const ScheduleModal = Object.assign(ScheduleModalMain, {})
