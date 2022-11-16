/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { API_KEY } from "../../features/data/dataSlice";
import { useParams } from "react-router-dom";
import { useFetch } from "../../useFetch";
const PublisherDetails = () => {
  const { name } = useParams();
  let [page, setPage] = useState(1);
  const { values, isFetched, count } = useFetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&publishers=${name}&page=${page}`,
    page
  );

  useEffect(() => {
    const handleScroll = () => {
      const isUserOnBottomSite =
        window.innerHeight + window.scrollY >= document.body.scrollHeight;
      const countBiggerThanResults =
        Math.ceil(count / 20) > Math.ceil(values.length / 20);

      if ((isUserOnBottomSite && countBiggerThanResults) || count === 1) {
        setPage((page += 1));
      }
    };
    window.addEventListener("scroll", handleScroll);
    console.log(values);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [values]);
  return (
    <div>
      {values.map((value: any) => value.name)}
      <h1>{String(isFetched)}</h1>
    </div>
  );
};

export default PublisherDetails;
