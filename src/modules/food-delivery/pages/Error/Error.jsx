import React from 'react'
import { Navbar, Footer } from '../../components'
const Error = () => {
  document.title = "Oops!! Not Found";
  return (
    <>
      <Navbar/>
        <h1>Oops!! Not Found</h1>
      <Footer/>
    </>
  )
}

export default Error