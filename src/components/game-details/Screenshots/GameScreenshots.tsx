import { useState, useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectData, API_KEY } from "../../../features/data/dataSlice";
const GameScreenshots = () => {
  const { singleGameDetails } = useAppSelector(selectData);
  const [screenshots, setScreenshots] = useState<string[]>([]);

  useEffect(() => {
    if (singleGameDetails.id) {
      fetch(
        `https://api.rawg.io/api/games/${singleGameDetails.id}/screenshots?key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.count > 0) {
            data.results.map((result: { image: string }) => {
              setScreenshots((ss) => [...ss, result.image]);
            });
          }
        });
    }
  }, [singleGameDetails.id]);

  if (screenshots) {
    return (
      <div className="screenshots">
        {screenshots &&
          screenshots
            .slice(0, 5)
            .map((ss) => (
              <img key={ss} src={ss} className="screenshots__screenshot" />
            ))}
      </div>
    );
  } else return <></>;
};

export default GameScreenshots;
