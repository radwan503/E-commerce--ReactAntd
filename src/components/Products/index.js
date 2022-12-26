import { Badge, Button, Card, Image, List, message, Rate, Spin, Typography } from 'antd'
import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { getAllProduct,addToCart,getCategoryByProducts } from '../../API';



const Products = () => {
    const param = useParams();
    const [items, setItems] = useState([]);

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        (param?.categoryId 
        ?getCategoryByProducts(param.categoryId) 
        :getAllProduct()
        ).then(res => {
            setItems(res.products)
            setLoading(false)
        })
    }, [param])

    const addProductToCart =(item)=>{
       setLoading(true)
        addToCart(item.id).then(res=>{
            message.success(`${item.title} has been added to Cart.`);
            setLoading(false)
        })
       
    } 

    if(loading){
        return <Spin spinning/>
    }

    return (
        <div>
            <List grid={{ column: 4 }} dataSource={items} renderItem={(product, index) => {
                return (
                <Badge.Ribbon className='itemCardBadge' text={product.discountPercentage}>
                    <Card className='itemCard' 
                    title={product.title} key={index} 
                    cover={<Image className='itemCardImage' src={product.thumbnail}></Image>}
                    actions={[<Rate allowHalf disabled value={product.rating}></Rate>,
                    <Button loading={loading} type='link' onClick={()=>addProductToCart(product)}> Add to Card </Button>]}>
                        <Card.Meta title={
                            <Typography.Paragraph>
                                Price: ${product.price}
                                <Typography.Text style={{paddingLeft:'8px'}} delete type='danger'>
                                    ${parseFloat(product.price) + (product.price * product.discountPercentage).toFixed(2)}
                                </Typography.Text>
                            </Typography.Paragraph>
                        }
                            description={<Typography.Paragraph ellipsis={{ rows: 1, expandable: true, symbol: 'more' }}>{product.description}</Typography.Paragraph>}
                        >

                        </Card.Meta>
                    </Card>
                    </Badge.Ribbon>
                )
            }}>
            </List>
        </div>
    )
}

export default Products