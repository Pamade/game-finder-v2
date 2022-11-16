import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectData, API_KEY } from "../../../features/data/dataSlice";

interface Achievement {
  name: string;
  image: string;
  description: string;
  percent: string;
}

const GameAchievements = () => {
  const { singleGameDetails } = useAppSelector(selectData);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  let [achievementsPage, setAchievementsPage] = useState(1);
  const [areShowedAll, setAreShowedAll] = useState(false);
  const achievementsDisplay = areShowedAll
    ? achievements
    : achievements.slice(0, 6);

  useEffect(() => {
    if (singleGameDetails.id) {
      fetch(
        `https://api.rawg.io/api/games/${singleGameDetails.id}/achievements?page=${achievementsPage}&key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.count > 0) {
            setAchievementsPage((achievementsPage += 1));
            data.results.map((result: Achievement) => {
              setAchievements((prev) => [
                ...prev,
                {
                  name: result.name,
                  image: result.image,
                  percent: result.percent,
                  description: result.description,
                },
              ]);
            });
          }
        });
    }
  }, [achievementsPage, singleGameDetails.id]);
  if (achievements.length !== 0) {
    return (
      <div className="achievements">
        <h3 className="game-details__title">Achievements</h3>
        <div className="achievements__wrapper">
          {achievementsDisplay.map((achievement: Achievement) => (
            <div key={achievement.name} className="achievements__box">
              <img
                className="achievements__image"
                src={achievement.image}
                alt={achievement.name}
              />
              <div className="achievements__info">
                <p className="achievements__percent">{achievement.percent}%</p>
                <p className="achievements__name">{achievement.name}</p>
                <p className="achievements__description">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p
          onClick={() => setAreShowedAll(!areShowedAll)}
          className="achievements__show-all"
        >
          {areShowedAll ? "hide" : "show all achievements"}
        </p>
      </div>
    );
  } else return <></>;
};

export default GameAchievements;
