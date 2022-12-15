import React from 'react';
import { Menu } from 'antd';
import { HomeFilled} from '@ant-design/icons';
import {useNavigate}  from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate();
    const onMenuClick =(item)=>{
        navigate(`/${item.key}`)
    }


  return (
    <div className='appHeader'>
        <Menu
        onClick={onMenuClick}
        mode='horizontal' 
        items={[
            {
                label:<HomeFilled/>,
                key:""    
            },
            {
                label:"Men",
                key:"men",
                children:[
                    {
                        label:"Men's Shirt",
                        key:"mens-shirt"
                    },
                    {
                        label:"Men's Shoes",
                        key:"mens-shoes"
                    },
                    {
                        label:"Men's Watches",
                        key:"mens-watches"
                    }
                ]     
            },
            {
                label:"Women",
                key:"women",
                children:[
                    {
                       label:"Women Dresses",
                       key:"women-dresses"
                    },
                    {
                        label:"Women Shoes",
                        key:"women-shoes"
                     },
                     {
                        label:"Women Watches",
                        key:"women-watches"
                     },
                     {
                        label:"Women's bags",
                        key:"women-bags"
                     },
                     {
                        label:"Women Jewellary",
                        key:"women-jewellary"
                     },
                ]    
            },
            {
                label:"Fragrances",
                key:"fragrances"    
            },
        ]}></Menu>
    </div>
  )
}

export default Header