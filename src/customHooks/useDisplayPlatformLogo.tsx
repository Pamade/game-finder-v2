import { FaPlaystation, FaXbox } from "react-icons/fa";
import { IoDesktop } from "react-icons/io5";
import { SiNintendo3Ds } from "react-icons/si";
export const useDisplayPlatformLogo = () => {
  const displayPlatformLogo = (name: string) => {
    if (name === "PC") {
      return <IoDesktop key={name} className="platform-icon" />;
    } else if (name.includes("Xbox")) {
      return <FaXbox key={name} className="platform-icon" />;
    } else if (name.includes("PlayStation")) {
      return <FaPlaystation key={name} className="platform-icon" />;
    } else if (name.includes("Nintendo")) {
      return <SiNintendo3Ds key={name} className="platform-icon" />;
    } else return "";
  };
  return displayPlatformLogo;
};
