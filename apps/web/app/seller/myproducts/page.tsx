'use client'

import { Carousel, Typography, Image as Img, Space, message, Skeleton, Empty } from "antd";
const { Title, Text, Paragraph } = Typography
import Image from 'next/image'
import styled from 'styled-components'
import NavBar from 'ui/NavBar'
import banner2 from './public/headbanner3.jpg'
import { StarFilled, StarTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Fetch from "fetch";
import { getproductsurl, getproducturl } from "config";
import Link from "next/link";

export default function MyProducts() {

  const [products, setProducts] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();
  const [username, setUsername] = useState();

  const error = (content: string) => {
    messageApi.open({
      type: 'error',
      content: content,
    });
  };

  useEffect(() => {
    async function getProduct() {
      const api = new Fetch({}, getproductsurl);
      const res = await api.get();
      if ('stauts' in res) {
        if (res.stauts) {
          console.log(res)
          if ('products' in res) setProducts(res.products);
        }
        else {
          if ('msg' in res) error(res.msg);
        }
      }
    }
    getProduct();
  }, [])

  return (
    <StyledDiv>
      <NavBar />
      <main>
        <div className="banner">
          <Empty />
        </div>
        <div className="main-content">

          <div className="product-grid">

            {
              products
                ? (products.length > 0)
                  ? products.map(product => {
                    return (
                      <Link href={`./updateproduct/${product._id}`} className="product">
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
                  }).reverse()
                  : <Empty />
                : <Skeleton active /> 
            }

          </div>
        </div>
      </main>
    </StyledDiv >
  );
}

const StyledDiv = styled.div`
  padding: 60px;

  main{
    margin: auto;
    max-width: 1920px
  }

  .banner{
    width: 100%;
    margin-top: 60px;
    overflow: hidden;
    img{
      border-radius: 15px;
      width: inherit;
      height: inherit;
      object-fit: cover;
    }
  }

  .main-content{
    margin: auto;
    margin-top: 60px;
    max-width: 1444px;
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
    transition: all 0.3s ease-in-out;

    &:hover{
      transform: translateY(-15px);
      box-shadow: 0 10px 10px rgba(0, 0, 0, 0.07);
    }

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
