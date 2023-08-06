'use client'

import styled from 'styled-components'
import { Carousel, Typography, Image as Img, Space, message, Button, Skeleton, Empty } from "antd";
const { Title, Text, Paragraph } = Typography;
import { StarFilled, StarTwoTone } from "@ant-design/icons";
import NavBar from 'ui/NavBar'
import { useEffect, useState } from 'react';
import Fetch from 'fetch';
import { buyfromcartturl, getbuyerorderurl, getcarturl, getproductsurl, getproducturl, getsellerorderurl } from 'config';
import Link from "next/link";
import { BuyFromCartParams } from 'types';
import { useRouter } from 'next/navigation';


export default function Cart() {

  const [products, setProduct] = useState<any>();
  const [orders, setOrders] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [pidarr, setpidarr] = useState([]);
  const [sellerarr, setsellerarr] = useState([]);
  const router = useRouter();

  const error = (content: string) => {
    messageApi.open({
      type: 'error',
      content: content,
    });
  };

  const success = (content: string) => {
    messageApi.open({
      type: 'success',
      content: content,
    });
  };

  useEffect(() => {
    async function getProduct() {
      const api = new Fetch({}, getcarturl);
      const res = await api.get();
      if ('status' in res) {
        if (res.status) {
          if ('cart' in res) {
            let cartArr = res.cart;
            let cartArrWithProduct = [];
            
            for (let i = 0; i < cartArr.length; i++) {
              let product = await getProductDetails(cartArr[i].pid);
              cartArrWithProduct.push(product);
            }
            
            setProduct(cartArrWithProduct);
            let sellarr = [];
            cartArr = cartArr.map( item => {
              sellarr.push(item.username);
              return item.pid;  
            })
            setpidarr(cartArr);
            setsellerarr(sellarr);
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

  const buyall = async () => {
    const payload: BuyFromCartParams = {
      seller : sellerarr,
      pid: pidarr
    }
    const api = new Fetch(payload, buyfromcartturl);
    const res = await api.postAuthjson();
    console.log(res);
    if (res.status){
      success("Purchase Sucess");
      router.push('../');
    }
  }

  return (
    <StyledDiv>
      {contextHolder}
      <NavBar />

      <main>
        <div className="product-grid">

          {
            products
              ? (products.length > 0)
                ? products.map( product => {
                  return (
                    <Link href={`../product/${product._id}`} className="product">
                      <div className="img-wrapper"><img src={product.img1} alt="" /></div>
                      <div className="info">
                        <Title level={4}>Title of the product</Title>
                        <Text type='secondary'>some description of the product</Text>
                        <br />
                        <Title level={3}> $ 33</Title>
                      </div>
                    </Link>
                  )
                })
                : <Empty />
              : <Skeleton active />
          }

        </div>
        {
            products
              ? (products.length > 0)
                ? <Button type='primary' size='large' onClick={buyall}>Proceed To Buy</Button>
                : null
              : <Skeleton active />
          }
      </main>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  padding: 60px;
  max-width: 1920px;
  margin: auto;

  main {
    margin: auto;
    margin-top: 60px;
    max-width: 1444px;

    .product-grid{
      display: flex;
      flex-direction: column;
      gap: 30px;
      margin-bottom: 60px;
    }

    .product{
      display: flex;
      gap: 30px;
      padding: 30px;
      border: 1px solid lightgrey;
      border-radius: 15px;
      text-decoration: none;
    }

    .img-wrapper{
      width: 300px;
      height: 250px;
      overflow: hidden;
      border-radius: 15px;

      img{
        width: inherit;
        height: inherit;
        object-fit: cover;
      }
    }

  }

  
`