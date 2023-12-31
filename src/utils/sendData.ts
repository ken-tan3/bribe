const sendData = async (
  method: string = "",
  requestUrl: string = "",
  body: any = ""
) => {
  try {
    const res = await fetch(requestUrl, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
  } catch (error) {}
};

export default sendData;
