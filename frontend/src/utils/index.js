export const createArrayOfAlphabeticallyGrouped = (data) => {
  return Object.entries(
    data.reduce((memo, user) => {
      const fL = user.name[0].toUpperCase();
      if (fL in memo) {
        memo[fL].push(user);
      } else {
        memo[fL] = [user];
      }
      return memo;
    }, {})
  );
};

export const getMondays = () => {
  let d = new Date();
  d.setDate(1);

  const endYear = d.getFullYear() + 1;
  const endMonth = d.getMonth();

  // Set to first Monday
  d.setDate(d.getDate() + ((8 - (d.getDay() || 7)) % 7));
  const mondays = [new Date(+d).toLocaleDateString()];

  // Create Dates for all Mondays up to end year and month
  while (d.getFullYear() < endYear || d.getMonth() !== endMonth) {
    const mondayDate = new Date(d.setDate(d.getDate() + 7));
    mondays.push(mondayDate.toLocaleDateString());
  }
  return mondays;
};
