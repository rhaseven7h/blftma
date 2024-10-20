import ApplicationTable from '@/components/application-table';
import { ErrorMessage } from '@/components/common/error-message';
import { Loading } from '@/components/common/loading';
import { projectListColumns } from '@/components/projects/columns';
import blftmaApi from '@/store/services/blftma';
import { Project } from '@/types/projects';
import { getCoreRowModel, TableOptions, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

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

  if (projectsResult.isLoading || projectsResult.isFetching || projectsResult.isUninitialized) {
    return <Loading />;
  }

  if (projectsResult.isError) {
    return <ErrorMessage error={projectsResult.error} />;
  }

  return (
    <div className={'w-full max-w-none prose'}>
      <h1>Projects List</h1>
      <ApplicationTable table={table} />
    </div>
  );
};

export default ProjectsList;
