import { lambdaUrls } from "@/config/lambda-urls";
import { CustomerType } from "@/types/customer-type";
import { ProductType } from "@/types/product-type";
import { CreateProductInput } from "@/validators/create-product.schema";

export async function getProduct(id: string): Promise<ProductType> {
  const url = `${lambdaUrls.getProducts}/${id}`;
  console.log(url);
  const response = await fetch(url, {
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


export async function getCustomers(): Promise<CustomerType> {
    const response = await fetch(lambdaUrls.customers, {
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
          const customerJson = data.data[i];
          const product: CustomerType = {
            id: customerJson.id,
            name: customerJson.name,
            fname: customerJson.fname,
            lname: customerJson.lname,
            contact_no: customerJson.contact_no,
            email: customerJson.email,
            address: customerJson.address,
            image: ''
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
      'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY ?? ''
    },
    body: JSON.stringify(payload)
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
