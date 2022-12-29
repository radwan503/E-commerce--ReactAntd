import { Typography } from 'antd'
import React from 'react'

const Footer = () => {
  return (
    <div className='appFooter'>
      <Typography.Link href="https://www.google.com" target="_blank">Privacy policy</Typography.Link>
      <Typography.Link href="https://www.google.com" target="_blank"> Terms & Conditions</Typography.Link>
      <Typography.Link href="https://www.google.com" target="_blank">Return Policy</Typography.Link>
      <Typography.Link href="tel:+1234567" target="_blank">+008 123567 896</Typography.Link>
    </div>
  )
}

export default Footer