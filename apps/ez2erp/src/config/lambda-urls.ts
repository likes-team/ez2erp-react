// Ez2ERP lambda urls

export const lambdaUrls = {
    login: `${process.env.NEXT_PUBLIC_LAMBDA_HOST}/login`,
    createProduct: `${process.env.NEXT_PUBLIC_LAMBDA_HOST}/products`,
    getProducts: `${process.env.NEXT_PUBLIC_LAMBDA_HOST}/products`
}