export const convertCmToFeetInches = (cm) => {
  const totalInches = cm * 0.393701;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
};
