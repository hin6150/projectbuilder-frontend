'use client'

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react'

interface ModalState {
  open: boolean
  type: ModalTypes
}

interface ModalValues {
  modals: {
    dimed: ModalState
    default: ModalState
  }
  openModal: (key: ModalKey, type: ModalTypes) => void
  closeModal: (key: ModalKey) => void
  closing: { dimed: boolean; default: boolean }
}

export enum ModalTypes {
  CREATE,
  EDIT,
  DELETE,
  DELETE_REPEAT,
  INVITE,
  REPEAT,
  CHECK,
  NULL,
}

type ModalKey = 'dimed' | 'default'

const ModalContext = createContext<ModalValues | undefined>(undefined)

export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [modals, setModals] = useState<{
    dimed: ModalState
    default: ModalState
  }>({
    dimed: { open: false, type: ModalTypes.NULL },
    default: { open: false, type: ModalTypes.NULL },
  })
  const [closing, setClosing] = useState<{ dimed: boolean; default: boolean }>({
    dimed: false,
    default: false,
  })

  const openModal = useCallback((key: ModalKey, type: ModalTypes) => {
    if (key == 'dimed') document.body.classList.add('scroll-locked')

    setModals((prevModals) => ({
      ...prevModals,
      [key]: {
        ...prevModals[key],
        open: true,
        type: type,
      },
    }))
  }, [])

  const closeModal = useCallback((key: ModalKey) => {
    if (key == 'dimed') document.body.classList.remove('scroll-locked')

    setClosing((prev) => ({ ...prev, [key]: true }))
    setTimeout(() => {
      setModals((prevModals) => ({
        ...prevModals,
        [key]: {
          ...prevModals[key],
          open: false,
          type: ModalTypes.NULL,
        },
      }))
      setClosing((prev) => ({ ...prev, [key]: false }))
    }, 500)
  }, [])

  return (
    <ModalContext.Provider
      value={{
        modals,
        openModal,
        closeModal,
        closing,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)

  if (context === undefined) {
    throw new Error(
      'useModal 커스텀 훅은 ModalContextProvider 내부에서 호출해야 합니다.',
    )
  }

  return context
}
