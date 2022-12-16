export const getAllProduct = () => {
    return fetch('https://dummyjson.com/products')
        .then(res => res.json())

}