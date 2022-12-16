import { Card, Image, List, Row, Typography } from 'antd'
import React, { useState, useEffect } from 'react'
import { getAllProduct } from '../../API'

const Products = () => {
    const [items, setItems] = useState([])
    useEffect(() => {
        getAllProduct().then(res => {
            setItems(res.products)
        })
    }, [])
    return (
        <div>
            <List grid={{ column: 3 }} dataSource={items} renderItem={(product, index) => {
                return (
                    <Card title={product.title} key={index} cover={<Image className='itemCardImage' src={product.thumbnail}></Image>}>
                        <Card.Meta title={
                            <Typography.Paragraph>
                                Price: ${product.price}
                                <Typography.Text>
                                    ${parseFloat(product.price) + (product.price * product.discountPercentage).toFixed(2)}
                                </Typography.Text>
                            </Typography.Paragraph>
                        }
                            description={<Typography.Paragraph ellipsis={{ rows: 1, expandable: true, symbol: 'more' }}>{product.description}</Typography.Paragraph>}
                        >

                        </Card.Meta>
                    </Card>
                )
            }}>
            </List>
        </div>
    )
}

export default Products