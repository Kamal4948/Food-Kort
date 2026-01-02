
import Login from './screens/Login'
import OTP from './screens/OTP'
import Home from './screens/Home'
import Detail from './screens/Detail'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full">
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
      </div>
    </div>
  )
}
