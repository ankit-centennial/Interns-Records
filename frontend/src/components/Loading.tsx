import { ThreeDots } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="h-screen mt-10 ">
      <ThreeDots height={70} width={70} color="blace"></ThreeDots>
      <p className="text-xl font-bold py-3">Fetching Data...</p>
    </div>
  );
};

export default Loading;
