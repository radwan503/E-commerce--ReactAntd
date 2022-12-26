export const getAllProduct = () => {
    return fetch('https://dummyjson.com/products')
        .then(res => res.json())

}

export const getCategoryByProducts =(category)=>{
    return fetch(`https://dummyjson.com/products/category/${category}`)
    .then(res => res.json())
}

export const getCart = ()=>{
    return fetch('https://dummyjson.com/carts/1')
   .then(res => res.json())
}

export const addToCart = (productId) =>{
    return fetch('https://dummyjson.com/carts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        userId: 1,
        products: [
        {
            id: productId,
            quantity: 1,
        },
        ]
    })
    })
    .then(res => res.json())
    .then(console.log);
            
}