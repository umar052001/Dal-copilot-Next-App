import arabicText from "../data/ar.json";
import englishText from "../data/en.json";

export const determineDictionary = (lang:string) => {
  if (lang === "ar") {
    return arabicText;
  } else {
    return englishText;
  }
};
