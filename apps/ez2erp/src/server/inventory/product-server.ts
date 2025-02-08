import { lambdaUrls } from "@/config/lambda-urls";
import { ProductType } from "@/types/product-type";
import { CreateProductInput } from "@/validators/create-product.schema";


export async function getProducts(): Promise<ProductType> {
    const response = await fetch(lambdaUrls.getProducts, {
        'method': 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then((res: any) => res.json())
      .then((data) => {
        const result: any = [];
        console.log(data.data.length);
        for (let i=0; i < data.data.length; i++){
          const productJson = data.data[i];
          const product: ProductType = {
            id: productJson.id,
            sku: productJson.sku,
            category: productJson.category_id,
            name: productJson.name,
            salePrice: productJson.sale_price,
            costPrice: productJson.cost_price,
            stock: 0,
            image: '',
            status: '',
          }
          result.push(product)
        }
        return result;
      });
    return response;
} 

export async function createProduct(data: CreateProductInput): Promise<any> {
  console.log('product_data', data);

  const payload = {
    'name': data.name,
    'sku': data.sku,
    'product_type': data.productType,
    'category_id': data.category,
    'description': data.description,
    'cost_price': data.costPrice,
    'sale_price': data.salePrice
  }

  const createProductResponse = await fetch(lambdaUrls.createProduct, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  }).then((response) => {
    return response.json();
  })
  return createProductResponse;
}

