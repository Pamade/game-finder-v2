import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectGameDetails } from "../singleGameDetailsSlice";

const GameDescription = () => {
  const { singleGameDetails } = useAppSelector(selectGameDetails);
  const [descriptionHidden, setDescriptionHidden] = useState(true);

  const handleToggleDescription = () => {
    setDescriptionHidden(!descriptionHidden);
  };

  if (descriptionHidden) {
    return (
      <p className="game-description">
        {singleGameDetails.description_raw &&
          singleGameDetails.description_raw.slice(0, 300)}
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
