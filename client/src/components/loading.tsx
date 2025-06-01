import CircleLoader from "react-spinners/CircleLoader";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <CircleLoader color="#0D6EFD" size={480} />
    </div>
  );
};

export default Loading;
