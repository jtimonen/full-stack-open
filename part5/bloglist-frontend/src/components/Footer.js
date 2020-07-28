import config from '../config.js'
import React from 'react'

const baseUrl = config.baseUrl

const Footer = () => {
  return(
    <footer> base url: {baseUrl}</footer>
  )
}

export default Footer
