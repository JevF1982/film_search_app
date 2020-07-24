// setup config/headers and token

export const tokenConfig = (getState) => {
  // get token from localStorage
  const token = getState().auth.token;
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // if user has token then add it to the headers

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
