const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const months = (config: any) => {
  const cfg = config || {};
  const count = cfg.count || 12;
  const section = cfg.section;
  const values = [];
  let i, value;

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12];
    values.push(value.substring(0, section));
  }

  return values;
};

export const formatDate = (date: any) => {
  let newDate = new Date(date);
  let fullDate = new Date(
    newDate.getFullYear(),
    newDate.getMonth(),
    newDate.getDate()
  ).toString();

  const day = fullDate.split(" ")[0];
  const month = fullDate.split(" ")[1];
  const year = fullDate.split(" ")[3];

  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
};
