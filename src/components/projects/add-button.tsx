import { Button } from 'flowbite-react';
import { TbPlus } from 'react-icons/tb';

export type AddProjectButtonProps = {
  onAddProject: () => void;
};

export const AddProjectButton = ({ onAddProject }: AddProjectButtonProps) => {
  return (
    <Button
      className={'mt-4'}
      color={'success'}
      size={'sm'}
      onClick={onAddProject}>
      <div className={'flex flex-row flex-nowrap gap-2 items-center px-8'}>
        <TbPlus />
        <span>Add Project</span>
      </div>
    </Button>
  );
};
