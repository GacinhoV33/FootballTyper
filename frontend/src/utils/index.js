export async function requestHandler(request) {
  const response = await request
    .then((response) => {
      //   console.log("response: ", response);
      if (response.ok) {
        return response.json();
      }
      if (response.status === 401) {
        handleLogOut();
        return Promise.reject("Unauthorized");
      }
      return Promise.reject(response);
    })
    .then((data) => {
      //   console.log("data: ", data);
      return Promise.resolve(data);
    })
    .catch((data) => {
      console.log("Caught data: ", data);
      return Promise.resolve([]);
    });
  return response;
}

const handleLogOut = () => {
  console.log("Logging out!");
  localStorage.setItem("user", "");
  localStorage.setItem("userToken", "");
  localStorage.setItem("tokenExpirationDate", "");
  window.location.reload();
};
