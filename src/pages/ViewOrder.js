import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUser } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderByUser(orderId));
  }, [dispatch, orderId]);

  const orderState = useSelector((state) => state?.auth?.singleOrder?.order);

  const data1=[];
  for(let i=0;i<orderState?.orderItems?.length;i++){
    data1.push({
      key: i + 1,
      name:orderState?.orderItems[i]?.product?.title,    
      brand:orderState?.orderItems[i]?.product?.brand, 
      count:orderState?.orderItems[i]?.product?.quantity,
      color:orderState?.orderItems[i]?.product?.color,
      amount:orderState?.orderItems[i]?.product?.price,
    })
  }



 

  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
