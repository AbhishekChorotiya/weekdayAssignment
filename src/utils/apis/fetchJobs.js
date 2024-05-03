export const fetchJobs = async (page = 0) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const body = JSON.stringify({
    limit: 10,
    offset: page,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
  };

  const response = await fetch(
    "https://api.weekday.technology/adhoc/getSampleJdJSON",
    requestOptions
  );

  const data = await response.json();
  console.log(data);
  return data;
};
