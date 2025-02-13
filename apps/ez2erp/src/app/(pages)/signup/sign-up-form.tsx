'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Password, Checkbox, Button, Input, Text } from 'rizzui';
import { useMedia } from '@core/hooks/use-media';
import { Form } from '@core/ui/form';
import { routes } from '@/config/routes';
import { SignUpSchema, signUpSchema } from '@/validators/signup.schema';
import { SignUp } from '@/server/auth/signup';
import toast from 'react-hot-toast';
const initialValues = {
  firstName:'',
  lastName:'',
  middleName:'',
  phoneNumber:'',
  email: '',
  password: '',
  isAgreed: false,
};

export default function SignUpForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const onSubmit: SubmitHandler <SignUpSchema> =async (data) => {
    
    let signUpData : any;
   signUpData = await SignUp(data);
;
    setReset({ ...initialValues, isAgreed: false });
    console.log("This is the Sign Up message",signUpData.status)

  };

  return (
    <>
      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            
            <Input
              type="text"
              size={isMedium ? 'lg' : 'xl'}
              label="First Name"
              placeholder="Enter your First Name"
              className="[&>label>span]:font-medium"
              {...register('firstName')}
              error={errors.firstName?.message}
            />
            <Input
              type="text"
              size={isMedium ? 'lg' : 'xl'}
              label="Middle Name"
              placeholder="Enter your Middle Name"
              className="[&>label>span]:font-medium"
              {...register('middleName')}
              error={errors.middleName?.message}
            />
            <Input
              type="text"
              size={isMedium ? 'lg' : 'xl'}
              label="Last Name"
              placeholder="Enter your Last name"
              className="[&>label>span]:font-medium"
              {...register('lastName')}
              error={errors.lastName?.message}
            />
             <Input
              type="text"
              size={isMedium ? 'lg' : 'xl'}
              label="Phone Number"
              placeholder="Enter your Phone Number"
              className="[&>label>span]:font-medium"
              {...register('phoneNumber')}
              error={errors.phoneNumber?.message}
            />
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? 'lg' : 'xl'}
              {...register('password')}
              className="[&>label>span]:font-medium"
              error={errors.password?.message}
            />
            {/* <div className="col-span-2 flex items-start text-gray-700">
              <Checkbox
                {...register('isAgreed')}
                className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
                label={
                  <Text as="span" className="ps-1 text-gray-500">
                    By signing up you have agreed to our{' '}
                    <Link
                      href="/"
                      className="font-semibold text-gray-700 transition-colors hover:text-primary"
                    >
                      Terms
                    </Link>{' '}
                    &{' '}
                    <Link
                      href="/"
                      className="font-semibold text-gray-700 transition-colors hover:text-primary"
                    >
                      Privacy Policy
                    </Link>
                  </Text>
                }
              />
            </div> */}
            <Button
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
            >
              Create Account
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t have an account?{' '}
        <Link
          href={routes.login}
          className="font-semibold text-gray-700 transition-colors hover:text-primary"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
