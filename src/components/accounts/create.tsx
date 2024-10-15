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
  const onSubmit: SubmitHandler<AccountCreateForm> = async (data) => {
    try {
      const result = await createAccount(data);
      if (result.error) {
        const fbqError = result.error as FetchBaseQueryError;
        switch (fbqError.status) {
          case 'FETCH_ERROR':
            toast(`Failed to create account: Fetch error. ${fbqError.error}.`, { type: 'error' });
            break;
          case 'PARSING_ERROR':
            toast(`Failed to create account: Invalid response. ${fbqError.error}.`, { type: 'error' });
            break;
          case 'TIMEOUT_ERROR':
            toast(`Failed to create account: Timeout error. ${fbqError.error}.`, { type: 'error' });
            break;
          case 'CUSTOM_ERROR':
            toast(`Failed to create account: Other error. ${fbqError.error}.`, { type: 'error' });
            break;
          default:
            toast(
              `Failed to create account: Unknown error. ` +
                `Status ${fbqError.status}: ${JSON.stringify(fbqError.data)}.`,
              { type: 'error' }
            );
        }
      } else {
        toast('Account created successfully.', { type: 'success' });
        setValue('name', '');
      }
    } catch (error) {
      toast(`Failed to create account: ${(error as Error).message}.`, { type: 'error' });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <h2 className={'text-lg font-bold pb-4'}>New Account</h2>
      <div className='mb-2 block'>
        <Label htmlFor='name' value='Account Name' {...(errors.name && { color: 'failure' })} />
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
            minLength={3}
            maxLength={128}
            required
            {...(errors.name && { color: 'failure' })}
            helperText={
              (errors.name && 'Name is required, and between 3 and 128 characters.') || "Enter the account's name."
            }
          />
        )}
      />
      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default AccountCreate;
