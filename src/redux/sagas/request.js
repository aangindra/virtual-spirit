import api from "../../services/api";

export const getRequest = async (requestUrl) =>
  api
    .get(requestUrl)
    .then((resp) => resp)
    .catch((error) => error.response);

export const postRequest = async (requestUrl, data) =>
  api
    .post(requestUrl, data)
    .then((resp) => resp)
    .catch((error) => error.response);

export const postFormDataRequest = async (requestUrl, data) => {
  const formData = new FormData();
  Object.keys(data).map((item) => formData.set(item, data[item]));
  return api
    .post(requestUrl, formData)
    .then((resp) => resp)
    .catch((error) => error.response);
};

export const patchRequest = async (requestUrl, data) => {
  return api
    .patch(requestUrl, data)
    .then((resp) => resp)
    .catch((error) => error.response);
};

export const deleteRequest = async (requestUrl, data) => {
  return api
    .delete(requestUrl, data)
    .then((resp) => resp)
    .catch((error) => error.response);
};
