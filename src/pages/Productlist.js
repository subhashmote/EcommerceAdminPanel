import { Table } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/product/productSlice';
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  

function Productlist() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getProducts());
  },[]);

  const productState = useSelector((state) => state.product.products);
  // console.log(productState);

  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i+1,
      title: productState[i].title,
      price: productState[i].price,
      brand:productState[i].brand,
      category:productState[i].category,
      color:productState[i].color,
      action: (
        <>
        <div className='d-flex gap-10'>
        <Link to="/" className=" fs-3 text-danger">
            <BiEdit fontSize={20}/>
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete fontSize={20}/>
          </Link>
        </div>
        </>
      ),
    });
  }


  return (
    <div>
      <h3 className="mb-4 title">Product List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      
    </div>
  )
}

export default Productlist