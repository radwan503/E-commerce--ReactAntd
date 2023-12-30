import React, { useState, useEffect } from 'react';
import { Badge, Button, Checkbox, Drawer, Form, Input, InputNumber, Menu, message, Table, Typography } from 'antd';
import { HomeFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { getCart } from '../../API';

const Header = () => {
    const navigate = useNavigate();
    const onMenuClick = (item) => {
        navigate(`/${item.key}`)
    }


    return (
        <div className='appHeader'>
            <Menu
                className='appMenu'
                onClick={onMenuClick}
                mode='horizontal'
                items={[
                    {
                        label: <HomeFilled />,
                        key: ""
                    },
                    {
                        label: "Men",
                        key: "men",
                        children: [
                            {
                                label: "Men's Shirt",
                                key: "mens-shirt"
                            },
                            {
                                label: "Men's Shoes",
                                key: "mens-shoes"
                            },
                            {
                                label: "Men's Watches",
                                key: "mens-watches"
                            }
                        ]
                    },
                    {
                        label: "Women",
                        key: "women",
                        children: [
                            {
                                label: "Women's Dresses",
                                key: "womens-dresses"
                            },
                            {
                                label: "Women's Shoes",
                                key: "womens-shoes"
                            },
                            {
                                label: "Women's Watches",
                                key: "womens-watches"
                            },
                            {
                                label: "Women's bags",
                                key: "womens-bags"
                            },
                            {
                                label: "Women's Jewellary",
                                key: "womens-jewellary"
                            },
                        ]
                    },
                    {
                        label: "Fragrances",
                        key: "fragrances"
                    },
                ]}></Menu>

            <AppCart />
        </div>
    )
}

const AppCart = () => {
    const [cartDrawer, setCartDrawer] = useState(false);
    const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
    const [cartItems, setCartItems] = useState([])
    useEffect(() => {
        getCart().then(res => {
            setCartItems(res.products)
        })
    }, [])

    const onConfirmOrder = (values) => {
        setCartDrawer(false)
        setCheckoutDrawerOpen(false)
        message.success("Your order has been placed success")
    }

    return (
        <div>
            <Badge onClick={() => setCartDrawer(true)} className='shoppingCartIcon' count={cartItems.length}><ShoppingCartOutlined /></Badge>
            <Drawer open={cartDrawer} onClose={() => setCartDrawer(false)}
                title="Your Cart"
                contentWrapperStyle={{ width: 600 }}>
                <Table pagination={false} columns={[
                    {
                        title: 'Title',
                        dataIndex: 'title'
                    },
                    {
                        title: 'Price',
                        dataIndex: 'price',
                        render: (value) => {
                            return <span>${value}</span>
                        }
                    },
                    {
                        title: 'Quantity',
                        dataIndex: 'quantity',
                        render: (value, record) => {
                            return <InputNumber min={0} defaultValue={value} onChange={(value) => {
                                setCartItems((pre) =>
                                    pre.map(cart => {
                                        if (record.id === cart.id) {
                                            cart.total = cart.price * value;
                                        }
                                        return cart;
                                    }

                                    )
                                )
                            }}>

                            </InputNumber>
                        }
                    },
                    {
                        title: 'Total',
                        dataIndex: 'total',
                        render: (value) => {
                            return <span>${value}</span>
                        }
                    }

                ]}
                    dataSource={cartItems}
                    summary={(data) => {
                        let totalVal = 0;
                        data.forEach(({ total }) => {
                            totalVal += total;
                        })
                        return <span className='text-right'>Total {totalVal}</span>

                    }}></Table>
                <Button onClick={() => setCheckoutDrawerOpen(true)} type='primary'>Checkout your cart</Button>
            </Drawer>
            <Drawer open={checkoutDrawerOpen} onClose={() => setCheckoutDrawerOpen(false)} title="Confirm Order">
                <Form onFinish={onConfirmOrder}>
                    <Form.Item rules={[{
                        required: true,
                        message: 'Please enter your name'
                    }]} label="full Name" name="full_name">
                        <Input placeholder='Enter your full name..'></Input>
                    </Form.Item>
                    <Form.Item rules={[{
                        required: true,
                        message: 'Please enter your email'
                    }]} label="Email" name="your_email">
                        <Input placeholder='Enter your email..'></Input>
                    </Form.Item>
                    <Form.Item rules={[{
                        required: true,
                        message: 'Please enter your address'
                    }]} label="Address" name="your_address">
                        <Input placeholder='Enter your address..'></Input>
                    </Form.Item>
                    <Form.Item>
                        <Checkbox defaultChecked disabled>Cash on Delivery</Checkbox>
                    </Form.Item>
                    <Typography.Paragraph type='primary' htmlType="submit">
                        Confirm Order
                    </Typography.Paragraph>
                    <Button type='primary' htmlType='submit'>Confirm Orders</Button>
                </Form>
            </Drawer>
        </div>
    )
}


export default Header