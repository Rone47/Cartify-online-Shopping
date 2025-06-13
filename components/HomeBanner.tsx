import React from 'react'
import { SubTitle, Title } from './ui/text'

function HomeBanner() {
  return (
    <div className='py-16 md:py-0 bg-shop_light_pink rounded-lg px-10 lg:px-24 flex items-center justify-between'>
      <div>
        <Title>Enjoy Up to 50% Off on <br/> Selected Items  Selected  items</Title>
        <SubTitle>Discover exclusive deals on a curated selection of <br/> products—limited-time offer while stocks last.</SubTitle>
      </div>
      <div></div>
    </div>
  )
}

export default HomeBanner
