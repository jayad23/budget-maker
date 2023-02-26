import React from 'react'
import { useLoaderData, Outlet } from 'react-router-dom';
import { fetchDataFromStorage } from '../helpers'
//assets
import wave from "../assets/wave.svg";
//components
import Nav from '../components/Nav';
export const mainLoader = () => {
  const userName = fetchDataFromStorage("userName");
  return {
    userName
  }
}

const MainLayout = () => {
  const { userName } = useLoaderData()
  return (
    <div className='layout'>
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img
        src={wave}
        alt="footer-wave-img"
      />
    </div>
  )
}

export default MainLayout