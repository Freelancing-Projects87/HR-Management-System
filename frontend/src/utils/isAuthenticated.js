export const isAuthenticUser = () => {
  const tokenjson = localStorage.getItem("userData");
  const token = JSON.parse(tokenjson && tokenjson);
  if (token == undefined || !token) {
    return false;
  }
  return true;
};
