'use client'

import styled from 'styled-components'
import { Button, Result, Skeleton, Space, Steps, Typography, message } from 'antd'
const { Title, Text } = Typography;
import NavBar from 'ui/NavBar'
import DelivryForm from 'ui/DelivryForm';
import PaymentOption from 'ui/PaymentOption';
import { useEffect, useState } from 'react';
import Fetch from 'fetch';
import { buyproducturl, getproducturl } from 'config';
import { OrderParams } from 'types';
import { useRouter } from 'next/navigation';

export default function Buy({ params }) {

  const [current, setCurrent] = useState(0);
  const [component, setComponent] = useState(<DelivryForm />);
  const [product, setProduct] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const error = (content: string) => {
    messageApi.open({
      type: 'error',
      content: content,
    });
  };

  useEffect(() => {
    async function getProduct() {
      const api = new Fetch({}, `${getproducturl}${params.id}`);
      const res = await api.get();
      if ('status' in res) {
        if (res.status) {
          if ('product' in res) setProduct(res.product);
        }
        else {
          if ('msg' in res) error(res.msg);
        }
      }
    }
    getProduct();
  }, []);

  const goNext = () => {
    setCurrent(current + 1);
    if (current == 0) {
      setComponent(<PaymentOption />)
    }
    if (current == 1) {
      buy();
    }
  }
  const goPrev = () => {
    setCurrent(current - 1);
  }
  async function buy() {
    if (product) {
      const payload: OrderParams = {
        seller: product.username,
        pid: params.id
      }
      const api = new Fetch(payload, buyproducturl);
      const res = await api.postAuthjson();
      if (res.status) {
        setComponent(<Result
          status="success"
          title={`Successfully Purchased`}
          subTitle={`Product number ${params.id} seller by ${product.username} buyer you`}
          extra={[
            <Button type="primary" key="console" onClick={() => router.push('../')}>
              Shop More
            </Button>,
            <Button key="buy">Buy Again</Button>,
          ]}
        />)
      }
      else setComponent(<div>
        {res.msg}
      </div>)
    }
  }
  return (
    <StyledDiv>
      <NavBar />
      <main>
        <div className="buy-step-wrapper">
          <Steps current={current} items={[
            {
              title: 'Details',
              description: 'give your details',
            },
            {
              title: 'Payment',
              description: "how will you pay",
            },
            {
              title: 'Complete',
              description: 'shop more',
            },
          ]} />

          <div className="content">
            {component}
          </div>

          {
            (current !== 2)
              ? <Space size={'large'}>
                <Button type='primary' onClick={goNext}>Next</Button>
                {(current != 0) ? <Button onClick={goPrev}>Previous</Button> : ""}
              </Space>

              : ''
          }

        </div>

        {
          product
            ?
            <div className="product-details-wrapper">
              <Title level={3}>Product Details</Title>
              <div className="img-wrapper"><img src={product.img1} alt="product" /></div>
              <Text strong>{product.title}</Text>
              <br />
              <Text type='secondary'>{product.description}</Text>
              <br />
              <Text style={{ fontSize: 17 }}>$ {product.price}</Text>
            </div>
            : <Space direction='vertical' size='large'>
              <Skeleton.Avatar active size='large' shape='square' />
              <Skeleton.Input active size='large' />
              <Skeleton active />
            </Space>
        }
      </main>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  padding: 60px;
  max-width: 1920px;
  margin: auto;

  main{
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 60px;
    margin: auto;
    max-width: 1444px;
    margin-top: 60px;
  }

  .product-details-wrapper, .buy-step-wrapper{
    padding: 30px;
    border: 1px solid lightgrey;
    border-radius: 15px;

    .img-wrapper{
      width: 100%;
      height: 400px;
      margin-bottom: 30px;
      overflow: hidden;
      border-radius: 15px;

      img{
        width: inherit;
        height: inherit;
        object-fit: cover;
      }
    }
  }

  .buy-step-wrapper{
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
`