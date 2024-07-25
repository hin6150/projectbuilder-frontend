import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
      <div className="text-2xl font-bold">Workspace</div>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-800">
        CN
      </div>
    </header>
  )
}

export default Header
