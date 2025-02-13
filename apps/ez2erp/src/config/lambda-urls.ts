// Ez2ERP lambda urls

export const lambdaUrls = {
    login: `${process.env.NEXT_PUBLIC_LAMBDA_HOST}/login`,
    users:`${process.env.NEXT_PUBLIC_LAMBDA_HOST}/users`,
    createProduct: `${process.env.NEXT_PUBLIC_LAMBDA_HOST}/products`,
    getProducts: `${process.env.NEXT_PUBLIC_LAMBDA_HOST}/products`,
    getProduct: 
        (id: string) => `${process.env.NEXT_PUBLIC_LAMBDA_HOST}/products/${id}`,
    updateProduct: 
    (id: string) => `${process.env.NEXT_PUBLIC_LAMBDA_HOST}/products/${id}`,
    getProductCategories: `${process.env.NEXT_PUBLIC_LAMBDA_HOST}/product-categories`,
    createProductCategory: `${process.env.NEXT_PUBLIC_LAMBDA_HOST}/product-categories`,
}