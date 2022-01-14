import API from "./api";

const LIMIT = 10;

const getNews = async () => {
  const response = await API.get(`/posts?_limit=${LIMIT}`);
  return response;
};

export default getNews