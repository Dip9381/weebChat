import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
const sidebar = () => {
  return (
    <>
    <Navbar />
    <Search/>
    <Chats/>
    </>
  )
}

export default sidebar