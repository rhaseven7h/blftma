import blftmaApi from '@/store/services/blftma';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Button, Label, TextInput } from 'flowbite-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const AccountCreate = () => {
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
    <form onSubmit={handleSubmit(onSubmit)} className='grow-0 w-[28em] flex flex-col gap-4 border p-4 rounded'>
      <div>
        <h2 className={'text-lg font-bold pb-4'}>New</h2>
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
                (errors.name && 'Name is required, and between 3 and 128 characters.') || "Enter the account's name."
              }
            />
          )}
        />
      </div>
      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default AccountCreate;
