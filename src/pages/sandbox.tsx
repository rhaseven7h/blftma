import blftmaApi from '@/store/services/blftma';

const SandboxPage = () => {
  const result = blftmaApi.useGetProjectsQuery();
  return <pre>{JSON.stringify(result, null, 2)}</pre>;
};

export default SandboxPage;
