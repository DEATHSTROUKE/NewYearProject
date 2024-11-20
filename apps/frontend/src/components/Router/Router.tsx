import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AfterLottery } from '@/pages/AfterLottery/AfterLottery'
import { BeforeGame } from '@/pages/BeforeGame/BeforeGame'
import { InGame } from '@/pages/InGame/InGame'
import { Register } from '@/pages/Register/Register'
import TestPage from '@/pages/TestPage'
import { WaitingFeedback } from '@/pages/WaitingFeedback/WaitingFeedback'
import { WaitingLottery } from '@/pages/WaitingLottery/WaitingLottery'
import { WaitingNextGame } from '@/pages/WaitingNextGame/WaitingNextGame'

import { App } from '../App/App'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path="/">
          <Route element={<BeforeGame />} path="/beforeGame" />
          <Route element={<InGame />} path="/inGame" />
          <Route element={<WaitingFeedback />} path="/waitFeedback" />
          <Route element={<WaitingNextGame />} path="/waitNextGame" />
          <Route element={<WaitingLottery />} path="/waitEndLottery" />
          <Route element={<AfterLottery />} path="/afterLottery" />
          <Route element={<Register />} path="/register" />
          <Route element={<TestPage />} path="/testPage" />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
