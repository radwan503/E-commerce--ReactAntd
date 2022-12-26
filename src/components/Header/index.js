import React,{useState,useEffect} from 'react';
import { Badge, Button, Drawer, InputNumber, Menu, Table } from 'antd';
import { HomeFilled, ShoppingCartOutlined} from '@ant-design/icons';
import {useNavigate}  from 'react-router-dom'
import { getCart } from '../../API';

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
                       label:"Women's Dresses",
                       key:"womens-dresses"
                    },
                    {
                        label:"Women's Shoes",
                        key:"womens-shoes"
                     },
                     {
                        label:"Women's Watches",
                        key:"womens-watches"
                     },
                     {
                        label:"Women's bags",
                        key:"womens-bags"
                     },
                     {
                        label:"Women's Jewellary",
                        key:"womens-jewellary"
                     },
                ]    
            },
            {
                label:"Fragrances",
                key:"fragrances"    
            },
        ]}></Menu>
        
         <AppCart/>
    </div>
  )
}

const AppCart = ()=>{
  const [cartDrawer, setCartDrawer] = useState(false);
  const [cartItems, setCartItems] = useState([])
  useEffect(() => {
    getCart().then(res=>{
      setCartItems(res.products)
    })
  }, [])
  
    return(
        <div>
            <Badge onClick={()=>setCartDrawer(true)} className='shoppingCartIcon' count={7}><ShoppingCartOutlined /></Badge>
            <Drawer open={cartDrawer} onClose={()=> setCartDrawer(false)}
            title="Your Cart"
            contentWrapperStyle={{width:600}}>
                <Table pagination={false} columns={[
                    {
                        title:'Title',
                        dataIndex:'title'
                    },
                    {
                        title:'Price',
                        dataIndex:'price',
                        render:(value)=>{
                            return <span>${value}</span>
                        }
                    },
                    {
                        title:'Quantity',
                        dataIndex:'quantity',
                        render:(value,record)=>{
                            return <InputNumber min={0} defaultValue={value} onChange={(value)=>{
                                setCartItems((pre)=>
                                    pre.map(cart=>{
                                        if(record.id === cart.id){
                                            cart.total = cart.price * value;
                                        }
                                        return cart;
                                    })
                                )
                            }}>
                                
                            </InputNumber>
                        }
                    },
                    {
                        title:'Total',
                        dataIndex:'total',
                        render:(value)=>{
                            return <span>${value}</span>
                        }
                    }
                    
                    ]} 
                    dataSource={cartItems}
                    summary={(data)=>{
                        let totalVal = 0;
                        data.forEach(({ total }) => {
                            totalVal += total;
                        })
                        return <span className='text-right'>Total {totalVal}</span>
                        
                    }}></Table>
                    <Button type='primary'>Checkout</Button>
            </Drawer>
        </div>
    )
}


export default Header