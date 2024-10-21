export const NoData = () => {
  return (
    <div className={'flex flex-col flex-nowrap gap-4'}>
      <div className={'prose max-w-none'}>
        <h1>No Data</h1>
        <p>No data was received.</p>
      </div>
    </div>
  );
};
