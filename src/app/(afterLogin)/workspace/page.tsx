'use client'

import { useState } from 'react'
import Card from '@/components/Card/Card'
import Header from '@/components/Header/Header'
import Button from '@/components/Button/ButtonForm'

export default function Home() {
  const project = {
    title: '프로젝트 이름이 들어 가야겠죠',
    description: '설명이 들어 가야겠죠',
    members: [
      { name: '재연', avatar: '/avatar1.png' },
      { name: '서우', avatar: '/avatar1.png' },
      { name: '홍기', avatar: '/avatar1.png' },
      { name: '재연', avatar: '/avatar1.png' },
      { name: '재연', avatar: '/avatar1.png' },
      { name: '재연', avatar: '/avatar1.png' },
      { name: '재연', avatar: '/avatar1.png' },
    ],
    startDate: '2024.07.11',
    endDate: '2024.07.11',
  }

  return (
    <main>
      <Header />
      <div className="m-5 flex justify-end">
        <Button variant="primary">+ 생성하기</Button>
      </div>
      <div className="container mx-auto flex justify-center gap-10 p-4">
        <Card {...project} />
        <Card {...project} />
        <Card {...project} />
      </div>
    </main>
  )
}
