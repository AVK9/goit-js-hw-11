import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = "40254095-fb7e3bf791467f50a6328bb1e";
let page = 1;

export default async function pixabayBase(inputDataUser) {
  try {
      const response = await axios.get('/', {
        params: {
            key: API_KEY,
            q: inputDataUser,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
            per_page: 40,
            page,
        }
      });
      console.log(response.data);
    return response.data
  } catch (error) {
    console.error(error);
  }
};
