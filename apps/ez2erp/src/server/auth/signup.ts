import { lambdaUrls } from "@/config/lambda-urls";
// import { ProductType } from "@/types/product-type";
// import { CreateProductInput } from "@/validators/create-product.schema";
import { SignUpSchema  } from "@/validators/signup.schema";

export async function SignUp(data: SignUpSchema ) : Promise<any> {
  
    console.log("Sign Up data:", data);
 

     const payload = {
      'email': data.email,
      'phone_no': data.phoneNumber,
      'fname': data.firstName,
      'lname': data.lastName,
      'mname': data.middleName,
      'password': data.password
    }
  
    const createSignUpResponse = await fetch(lambdaUrls.users, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
          'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      body: JSON.stringify(payload)
    }).then((response) => {
      return response.json();
    })
    return createSignUpResponse;
  }