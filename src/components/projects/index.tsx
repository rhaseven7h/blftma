import { AddProjectButton } from '@/components/projects/add-button';
import AddProjectModal from '@/components/projects/add-modal';
import ProjectsListTable from '@/components/projects/list-table';
import { useState } from 'react';

const ProjectsList = () => {
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  return (
    <>
      <AddProjectModal
        show={showAddProjectModal}
        closeModal={() => setShowAddProjectModal(false)}
      />
      <div className={'w-full max-w-none prose'}>
        <h1>Projects List</h1>
        <AddProjectButton onAddProject={() => setShowAddProjectModal(true)} />
        <ProjectsListTable />
      </div>
    </>
  );
};

export default ProjectsList;
