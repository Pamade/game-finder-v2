import { MAX_POSSIBLE_PAGE } from "../App";
import { useAppDispatch } from "../app/hooks";
import { setupPage } from "../features/data/dataSlice";
import { toast } from "react-toastify";

export const useRedirectPage = (page: number | string) => {
  const dispatch = useAppDispatch();
  const redirect = () => {
    if (Number(page) > MAX_POSSIBLE_PAGE) {
      toast.error("Invalid Page. You have been redirected!");
      dispatch(setupPage(MAX_POSSIBLE_PAGE));
    } else {
      dispatch(setupPage(Number(page)));
    }
  };
  return redirect;
};

export default useRedirectPage;
