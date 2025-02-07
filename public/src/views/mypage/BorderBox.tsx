type BorderBoxProps = {
  title: string;
  count: string;
};

export const BorderBox = (props: BorderBoxProps) => {
  const {title, count} = props;
  return (
    <>
      <div
        className=" flex flex-col justify-between p-4"
        style={{
          borderRight: '1px solid #e5e5e5',
          width: '250px',
        }}
      >
        <div className="h-12 flex flex-col justify-between">
          <div className="text-2xl">{title}</div>
          <div className="text-2xl ">{count}</div>
        </div>
      </div>
    </>
  );
};
