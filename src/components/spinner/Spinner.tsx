import Loader from "react-spinners/ClipLoader";

const Spinner = () => {
  return (
    <Loader
      color={"#efbc40"}
      loading={true}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Spinner;
