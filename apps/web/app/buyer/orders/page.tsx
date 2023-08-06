'use client'

import styled from 'styled-components'
import { Carousel, Typography, Image as Img, Space, message } from "antd";
const { Title, Text, Paragraph } = Typography;
import { StarFilled, StarTwoTone } from "@ant-design/icons";
import NavBar from 'ui/NavBar'
import { useEffect, useState } from 'react';
import Fetch from 'fetch';
import { getbuyerorderurl, getproductsurl, getproducturl } from 'config';
import Link from "next/link";


export default function BuyerOrders() {

  const [products, setProduct] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();

  const error = (content: string) => {
    messageApi.open({
      type: 'error',
      content: content,
    });
  };

  useEffect(() => {
    async function getProduct() {
      const api = new Fetch({}, getbuyerorderurl);
      const res = await api.get();
      if ('status' in res) {
        if (res.status) {
          if ('orders' in res) {
            let ordersArr = res.orders;
            let ordersArrWithProduct = [];

            for (let i = 0; i < ordersArr.length; i++) {
              let product = await getProductDetails(ordersArr[i].pid);
              ordersArrWithProduct.push(product);
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
    if (res.status) return res.product;
    else return ""
  }

  return (
    <StyledDiv>
      <NavBar />

      <main>
        <Title level={2}>Your Orders</Title>
        <div className="product-grid">

          {
            products
              ? (products.length > 0)
                ? products.map(product => {
                  return (
                    <Link href={`./status/${product._id}`} className="product">
                      <div className="img-wrapper"><img src={product.img1} alt="product image" /></div>
                      <Paragraph strong
                        ellipsis={{
                          rows: 1,
                        }}
                      >
                        {product.title}
                      </Paragraph>
                      <Space size='small'>
                        <StarFilled className='star-icon' />
                        <StarFilled className='star-icon' />
                        <StarFilled className='star-icon' />
                        <StarFilled className='star-icon' />
                        <StarTwoTone className='star-icon' />
                      </Space>
                      <p><Text style={{ fontSize: '20px' }}> <b style={{ color: '#aaa' }}>$</b> {product.price} </Text></p>
                    </Link>
                  )
                })
                : "No Orders"
              : "loading..."
          }
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

  .product-grid{
    margin-top: 30px;
    display: grid;
    gap: 60px;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-template-rows: 400px;
  }

  .product{
    padding: 20px;
    /* border: 1px solid #dddd; */
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
    text-decoration: none;

    .img-wrapper{
      height: 260px;
      width: 260px;
      margin-bottom: 20px;
      img{
      border-radius: 15px;
      width: inherit;
      height: inherit;
      object-fit: cover;
    }
    }

    .star-icon{
      color: #1b7eff;
    }

    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
  }

  .ant-typography-ellipsis{
    margin-bottom: 5px !important
  }
`