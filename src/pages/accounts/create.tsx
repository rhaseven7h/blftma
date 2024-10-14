import blftmaApi from '@/store/services/blftma';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Button, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TbArrowBack } from 'react-icons/tb';
import { toast, ToastContainer } from 'react-toastify';
import { z } from 'zod';

import 'react-toastify/dist/ReactToastify.css';

const AccountsCreatePage = () => {
  const [createAccount] = blftmaApi.useCreateAccountMutation();
  const schema = z.object({
    name: z.string().min(3).max(128).trim()
  });
  type AccountCreateForm = z.infer<typeof schema>;
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<AccountCreateForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: ''
    }
  });
  const onSubmit: SubmitHandler<AccountCreateForm> = (data) => {
    createAccount(data)
      .then((result) => {
        if (result.error) {
          const errorMessage = ((result.error as FetchBaseQueryError).data as Error).message;
          toast(`Failed to create account: ${errorMessage}.`, { type: 'error' });
        } else {
          toast('Account created successfully.', { type: 'success' });
          setValue('name', '');
        }
      })
      .catch((error) => {
        toast(`Failed to create account: ${error.message}.`, { type: 'error' });
      });
  };
  return (
    <div className={'container mx-auto my-8'}>
      <ToastContainer className={'!w-fit !max-w-[50vw]'} />
      <div className={'prose max-w-none'}>
        <h1>Business Leads Framework</h1>
        <p className={'italic text-neutral-500'}>Technical Maturity Assessments Management.</p>
        <hr />
        <h2>Create Account</h2>
        <p>
          Please fill in the form below to add a client account. Enter the client&apos;s account name and click the
          &ldquo;Submit&rdquo; button to complete the process.
        </p>
        <p>
          <Link href={'/accounts'} className={'w-fit text-teal-500 flex flex-row flex-nowrap items-center gap-2'}>
            <TbArrowBack className={'inline-block'} />
            <span>Go back to Accounts Management</span>
          </Link>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className='flex max-w-md flex-col gap-4 border p-4 rounded-lg'>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='name' value='Name' {...(errors.name && { color: 'failure' })} />
            </div>
            <Controller
              name={'name'}
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  id='name'
                  type='text'
                  placeholder='Awesome company, Inc.'
                  required
                  {...(errors.name && { color: 'failure' })}
                  helperText={
                    (errors.name && 'Name is required, and between 3 and 128 characters.') ||
                    "Enter the account's name."
                  }
                />
              )}
            />
          </div>
          <Button type='submit'>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default AccountsCreatePage;
