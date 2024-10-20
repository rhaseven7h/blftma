import ApplicationTable from '@/components/application-table';
import { ErrorMessage } from '@/components/common/error-message';
import { Loading } from '@/components/common/loading';
import { projectListColumns } from '@/components/projects/columns';
import blftmaApi from '@/store/services/blftma';
import { Project } from '@/types/projects';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCoreRowModel, TableOptions, useReactTable } from '@tanstack/react-table';
import { Button, Label, Modal, Select, TextInput } from 'flowbite-react';
import { useMemo, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(3).max(128).trim(),
  account_id: z.coerce.number().int().positive(),
  owner_name: z.string().min(3).max(128).trim(),
  owner_email: z.string().email().min(3).max(128).trim()
});

type ProjectFormValues = z.infer<typeof schema>;

type AddNewProjectModalProps = {
  show?: boolean;
  closeModal: () => void;
  onSave: (values: ProjectFormValues) => void;
};

const AddProjectModal = ({ show, closeModal, onSave }: AddNewProjectModalProps) => {
  const { control, handleSubmit, reset } = useForm<ProjectFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      account_id: 0,
      owner_name: '',
      owner_email: ''
    }
  });
  const nameFieldRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<ProjectFormValues> = async (values: ProjectFormValues) => {
    console.log('Form values:', values);
    onSave(values);
    reset();
    closeModal();
  };

  const onCancel = () => {
    reset();
    closeModal();
  };

  return (
    <Modal
      show={show}
      onClose={onCancel}
      initialFocus={nameFieldRef}
      dismissible>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header> Add Project</Modal.Header>
        <Modal.Body className={'flex flex-col flex-nowrap gap-8 max-h-[60vh] overflow-auto'}>
          {/* === Project Name === */}
          <div>
            <div className='mb-2 block'>
              <Label
                htmlFor='name'
                value={'Project Name'}
              />
              <span className={'text-red-500 font-bold ml-1'}>*</span>
            </div>
            <Controller
              name={'name'}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  ref={nameFieldRef}
                  id={'name'}
                  type={'text'}
                  minLength={3}
                  maxLength={128}
                  placeholder={'My Amazing Project'}
                  helperText={error ? error.message : 'Project name, 3 to 128 characters.'}
                  color={error ? 'failure' : ''}
                  required
                />
              )}
            />
          </div>
          {/* === Account === */}
          <div>
            <div className='mb-2 block'>
              <Label
                htmlFor={'account_id'}
                value={'Account'}
              />
              <span className={'text-red-500 font-bold ml-1'}>*</span>
            </div>
            <Controller
              name={'account_id'}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Select
                  {...field}
                  id='countries'
                  helperText={error ? error.message : 'Select the account this project will belong to.'}
                  color={error ? 'failure' : ''}
                  required>
                  <option value={undefined}></option>
                  <option value={1}>Chocolate</option>
                  <option value={2}>Vanilla</option>
                  <option value={3}>Strawberry</option>
                </Select>
              )}
            />
          </div>
          {/* === Owner Name === */}
          <div>
            <div className='mb-2 block'>
              <Label
                htmlFor='owner_name'
                value={'Project Owner Name'}
              />
              <span className={'text-red-500 font-bold ml-1'}>*</span>
            </div>
            <Controller
              name={'owner_name'}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  id={'owner_name'}
                  type={'text'}
                  minLength={3}
                  maxLength={128}
                  placeholder={'John Doe'}
                  helperText={error ? error.message : 'Project owner name, 3 to 128 characters.'}
                  color={error ? 'failure' : ''}
                  required
                />
              )}
            />
          </div>
          {/* === Owner Email === */}
          <div>
            <div className='mb-2 block'>
              <Label
                htmlFor='owner_email'
                value={'Project Owner Email'}
              />
              <span className={'text-red-500 font-bold ml-1'}>*</span>
            </div>
            <Controller
              name={'owner_email'}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  id={'owner_email'}
                  type={'email'}
                  placeholder={'john.doe@example.com'}
                  helperText={error ? error.message : 'Project owner email, 3 to 128 characters, valid email format.'}
                  color={error ? 'failure' : ''}
                  required
                />
              )}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className={'flex flex-row flex-nowrap gap-4 justify-end w-full'}>
            {/* === Cancel Button === */}
            <Button
              color={'gray'}
              size={'sm'}
              type={'button'}
              onClick={onCancel}>
              Cancel
            </Button>
            {/* === Add Project Button === */}
            <Button
              color={'success'}
              size={'sm'}
              type={'submit'}>
              Add Project
            </Button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

const ProjectsList = () => {
  const projectsResult = blftmaApi.useGetProjectsQuery({
    q: undefined,
    page: 1,
    size: 10
  });
  const columns = useMemo(() => projectListColumns, []);
  const data = projectsResult.data?.projects || [];
  const coreRowModel = getCoreRowModel<Project>();
  const options: TableOptions<Project> = {
    columns,
    data,
    getCoreRowModel: coreRowModel
  };
  const table = useReactTable<Project>(options);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  if (projectsResult.isLoading || projectsResult.isFetching || projectsResult.isUninitialized) {
    return <Loading />;
  }

  if (projectsResult.isError) {
    return <ErrorMessage error={projectsResult.error} />;
  }

  return (
    <>
      <AddProjectModal
        show={showAddProjectModal}
        closeModal={() => setShowAddProjectModal(false)}
        onSave={(values: ProjectFormValues) => console.log('(onSave) Add project:', values)}
      />
      <div className={'w-full max-w-none prose'}>
        <h1>Projects List</h1>
        <Button
          size={'xs'}
          onClick={() => setShowAddProjectModal(true)}>
          Add Project
        </Button>
        <ApplicationTable table={table} />
      </div>
    </>
  );
};

export default ProjectsList;
