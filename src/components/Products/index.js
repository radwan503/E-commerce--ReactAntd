import { Badge, Button, Card, Image, List, message, Rate, Select, Spin, Typography } from 'antd'
import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { getAllProduct,addToCart,getCategoryByProducts } from '../../API';



const Products = () => {
    const param = useParams();
    const [items, setItems] = useState([]);
    const [sortOrder,setSetOrder] =  useState("az")

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

    const getSortedItems = () =>{
        const sortedItems = [...items];
    sortedItems.sort((a,b)=>{
        const aLowerCase =  a.title.toLowerCase();
        const bLowerCase =  b.title.toLowerCase();

        if(sortOrder === "az"){
            return aLowerCase > bLowerCase ? 1: aLowerCase === bLowerCase ? 0 : -1
        }
        else if(sortOrder === "za"){
            return aLowerCase < bLowerCase ? 1: aLowerCase === bLowerCase ? 0 : -1
        }
        else if(sortOrder === "lowhigh"){
            return a.price > b.price ? 1: a.price === b.price ? 0 : -1
        }
        else if(sortOrder === "highlow"){
            return a.price < b.price ? 1: a.price === b.price ? 0 : -1
        }
    })
    return sortedItems;
    }

    if(loading){
        return <Spin spinning/>
    }

    return (
        <div className='productContainer'>
            <div>
                <Typography.Text>View Item Sorted</Typography.Text>
                <Select onChange={(value)=>{
                    setSetOrder(value)
                }} 
                defaultValue={'az'} options={[
                   {
                     label:'Alphabitically A-Z',
                     value:'az'
                    },
                    {
                      label:'Alphabitically Z-A',
                      value:'za'
                    },
                    {
                     label:'Price Low to High',
                     value:'lowhigh'
                    },
                    {
                     label:'Price high to low',
                     value:'highlow'
                    }
                ]}></Select>
            </div>
            <List loading={loading} grid={{ column: 4 }} dataSource={getSortedItems()} renderItem={(product, index) => {
                return (
                <Badge.Ribbon className='itemCardBadge' text={`${product.discountPercentage} %OFF`}>
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