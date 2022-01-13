import { add, getDate, getDay } from "date-fns";

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

export const getSum = (arr) => arr.reduce((a, b) => a + b, 0);

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

export const generateDaysArr = (startDate, arr) => {
  return arr.map((_, index) => {
    const currentDay = add(new Date(startDate), { days: index });
    return {
      day: getDay(currentDay),
      date: getDate(currentDay),
    };
  });
};

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const calculateTotalHoursPerColumn = (tasks) => {
  if (!tasks || tasks <= 0) return [];
  return tasks.reduce((acc, task) => {
    const { days } = task;
    days.forEach((day, index) => {
      if (acc[index]) {
        acc[index] += Number(day);
      } else {
        acc.push(Number(day));
      }
    });
    return acc;
  }, []);
};

export const getFieldFromArrObjsByValue = (arr, fieldName, value) =>
  arr.find((arrItem) => arrItem[fieldName] === value);
