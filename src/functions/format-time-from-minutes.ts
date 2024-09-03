export const formatTimeFromMinutes = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = Math.floor(duration % 60);

  if (hours === 0) {
    return `${minutes} min`;
  } else if (minutes === 0) {
    return `${hours} hr`;
  } else {
    return `${hours} hr ${minutes} min`;
  }
};
