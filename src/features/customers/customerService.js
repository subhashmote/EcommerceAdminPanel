import axios from "axios";
// import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";



const getUsers = async () => {
  const response = await axios.get(`${base_url}user/all-users`);

  
  return response.data;
};

const customerService = {
    getUsers,
  // getOrders,
  // getOrder,
};

export default customerService;