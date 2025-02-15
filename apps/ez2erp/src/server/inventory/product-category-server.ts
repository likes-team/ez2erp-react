import { lambdaUrls } from "@/config/lambda-urls";
import { ProductCategoryType } from "@/types/product-category-type";
import { ProductType } from "@/types/product-type";
import { ProductCategoryFormInput } from "@/validators/create-category.schema";
import { CreateProductInput } from "@/validators/create-product.schema";

export async function getProduct(id: string): Promise<ProductType> {
  const response = await fetch(lambdaUrls.getProduct(id), {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY ?? ''
      }
    })
    .then((res: any) => res.json())
    .then((json) => {
      console.log(json.data);
      const product: ProductType = {
        id: json.data.id,
        sku: json.data.sku,
        category: json.data.category_id,
        productType: json.data.product_type,
        name: json.data.name,
        salePrice: json.data.sale_price,
        costPrice: json.data.cost_price,
        stock: 0,
        image: '',
        status: ''
      }
      return product;
    });
  return response;
}


export async function getProductCategories(): Promise<ProductCategoryType> {
    const response = await fetch(lambdaUrls.getProductCategories, {
        'method': 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY ?? ''
        }
      })
      .then((res: any) => res.json())
      .then((data) => {
        const result: any = [];
        console.log(data.data.length);
        for (let i=0; i < data.data.length; i++){
          const jsonData = data.data[i];
          const productCategory: ProductCategoryType = {
            id: jsonData.id,
            name: jsonData.name,
            description: jsonData.description
          }
          result.push(productCategory)
        }
        return result;
      });
    return response;
} 


export async function createProductCategory(data: ProductCategoryFormInput): Promise<any> {
  console.log('payload:', data);

  const createProductResponse = await fetch(lambdaUrls.createProductCategory, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY ?? ''
    },
    body: JSON.stringify(data)
  }).then((response) => {
    return response.json();
  })
  return createProductResponse;
}


export async function updateProduct(id: string, data: CreateProductInput): Promise<any> {
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

  const updateProductResponse = await fetch(lambdaUrls.updateProduct(id), {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY ?? ''
    },
    body: JSON.stringify(payload)
  }).then((response) => {
    return response.json();
  })
  return updateProductResponse;
}


export async function deleteProduct(id: string): Promise<any> {
  console.log('id', id);

  const deleteProductResponse = await fetch(lambdaUrls.updateProduct(id), {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY ?? ''
    }
  }).then((response) => {
    return response.json();
  })
  return deleteProductResponse;
}
