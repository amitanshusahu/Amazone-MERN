'use client'

import styled from 'styled-components'
import { Carousel, Typography, Image as Img, Space, message } from "antd";
const { Title, Text, Paragraph } = Typography;
import { StarFilled, StarTwoTone } from "@ant-design/icons";
import NavBar from 'ui/NavBar'
import { useEffect, useState } from 'react';
import Fetch from 'fetch';
import { getbuyerorderurl, getproductsurl, getproducturl, getsellerorderurl } from 'config';
import Link from "next/link";


export default function SellerOrders() {

  const [products, setProduct] = useState<any>();
  const [orders, setOrders] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  const error = (content: string) => {
    messageApi.open({
      type: 'error',
      content: content,
    });
  };

  useEffect(() => {
    async function getProduct() {
      const api = new Fetch({}, getsellerorderurl);
      const res = await api.get();
      if ('status' in res) {
        console.log(res);
        if (res.status) {
          if ('orders' in res) {
            let ordersArr = res.orders;
            let ordersArrWithProduct = [];

            for (let i = 0; i < ordersArr.length; i++) {
              let product = await getProductDetails(ordersArr[i].pid);
              let productbj = {
                buyer: ordersArr[i].buyer,
                product,
              };
              ordersArrWithProduct.push(productbj);
            }

            setProduct(ordersArrWithProduct);
          }
        }
        else {
          if ('msg' in res) error(res.msg);
        }
      }
    }
    getProduct();
  }, []);

  const getProductDetails = async (pid: string) => {
    const api = new Fetch({}, `${getproducturl}${pid}`);
    const res = await api.get();
    if ('status' in res) {
      if (res.status) {
        if ('product' in res) return res.product;
      }
      else {
        if ('msg' in res) error(res.msg);
      }
    }
  }

  return (
    <StyledDiv>
      <NavBar />

      <main>
        <Title level={2}>Your Orders</Title>
        <div className="product-grid">
          <table>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Buyer</th>
            </tr>
            {
              products
                ? (products.length > 0)
                  ? products.map(product => {
                    return (
                      <tr>
                        <td className='img-wrapper'><img src={product.product.img1} alt="product" /></td>
                        <td> <Link href={`../product/${product.product._id}`}>{product.product.title}</Link></td>
                        <td>{product.buyer}</td>
                      </tr>
                    )
                  })
                  : "No Products"
                : "loading..."
            }

          </table>
        </div>
      </main>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  padding: 60px;
  max-width: 1920px;
  margin: auto;

  main {
    margin-top: 60px;
  }

  table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-top: 10px;

  .img-wrapper{
    width: 30px;
    height: 30px;
    overflow: hidden;
    
    img{
      border-radius: 5px;
      width: inherit;
      height: inherit;
      object-fit: cover;
    }
  }
}

td, th {
  text-align: left;
  padding: 10px;
  border: 1px solid #ccc;
}

tr:nth-child(even) {
  background-color: #d3f3ff;
}
`