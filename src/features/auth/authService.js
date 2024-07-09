import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";


const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    // console.log("response data:",response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};


const getOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/getaorder/${id}`,
    config
  );

  return response.data;
};

const getMonthlyOrders = async (data) => {
  const response = await axios.get(
    `${base_url}user/getmonthwiseorderincome`,
    data
  );

  return response.data;
};

const getyearlyStats = async (data) => {
  const response = await axios.get(
    `${base_url}user/getyearlyorders`,
    data
  );

  return response.data;
};


const updateOrder = async (data) => {
  const response = await axios.put(
    `${base_url}user/updateorder/${data.id}`,
    {status:data.status},
    config
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  getMonthlyOrders,
  getyearlyStats,
  updateOrder,
};

export default authService;