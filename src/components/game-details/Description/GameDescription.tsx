import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectData } from "../../../features/data/dataSlice";
const GameDescription = () => {
  const { singleGameDetails } = useAppSelector(selectData);
  const [descriptionHidden, setDescriptionHidden] = useState(true);

  const handleToggleDescription = () => {
    setDescriptionHidden(!descriptionHidden);
  };

  if (descriptionHidden) {
    return (
      <p className="game-description">
        {singleGameDetails.description_raw &&
          singleGameDetails.description_raw.slice(0, 500)}
        <span
          onClick={handleToggleDescription}
          className="game-description--toggle"
        >
          READ MORE...
        </span>
      </p>
    );
  } else
    return (
      <p className="game-description">
        {singleGameDetails.description_raw}
        <span
          onClick={handleToggleDescription}
          className="game-description--toggle"
        >
          HIDE
        </span>
      </p>
    );
};

export default GameDescription;
