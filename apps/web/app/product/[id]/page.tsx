'use client'

import styled from 'styled-components';
import { Typography, Space, Button, Image, List, Avatar, message } from 'antd';
const { Title, Text } = Typography;
import { StarTwoTone, StarFilled, RightOutlined, ThunderboltFilled, ShoppingCartOutlined, MoneyCollectFilled, HomeFilled, MoneyCollectOutlined } from '@ant-design/icons';
import Paragraph from 'antd/es/typography/Paragraph';
import { useEffect, useState } from 'react';
import Fetch from 'fetch';
import { addtocarturl, getproducturl, meurl } from 'config';
import { AddToCartParams, OrderParams } from 'types'
import { useRouter } from 'next/navigation';

const imgFallback: string = 'https://i.pinimg.com/1200x/7a/4b/a3/7a4ba30875e0de9567889866eb66bc4c.jpg';

export default function Product({ params }) {

  const [product, setProduct] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();
  const [username, setUsername] = useState();
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
    async function getUsername() {
      const api = new Fetch({}, meurl);
      const res = await api.get();
      if ('status' in res) {
        if (res.status) {
          setUsername(res.username);
        }
        else error(res.msg);
      }
    }
    getProduct();
    // getUsername();
  }, [])

  const buyProduct = () => {
    router.push(`../buy/${params.id}`)
  }

  const addToCart = async () => {
    console.log('working')
    const payload: AddToCartParams = {
      pid: params.id
    }

    const api = new Fetch(payload, addtocarturl);
    const res = await api.postAuthjson();
    if ('status' in res) {
      if (res.status) {
        console.log(res);
        success("Added to cart");
      }
      else {
        if ('msg' in res && typeof res.msg == 'string') error(res.msg);
        else error('something is wrong');
      }
    }
    else error('something is wrong');
  }

  return (
    <StyledDiv>
      {contextHolder}
      <div className="product-wrapper">

        <div className="product-img-wrapper">
          <div className="big-img-wrapper">
            <Image src={product ? product.img1 : ""} />
          </div>
          <div className="small-img-container">
            <div className="img-wrapper">
              <img src={product ? product.img1 : ""} />
            </div>
            <div className="img-wrapper">
              <img src={product ? product.img2 : ""} />
            </div>
            <div className="img-wrapper">
              <img src={product ? product.img3 : ""} />
            </div>
            <div className="img-wrapper">
              <img src={product ? product.img4 : ""} />
            </div>
          </div>
        </div>

        <div className="product-desc-wrapper">
          <div className="title">
            <Title>{product ? product.title : ""}</Title>
            <Text>{product ? product.description : ""}</Text>
          </div>

          <div className="star-review">
            <span>
              <Space size='small'>
                <StarFilled className='star-icon' />
                <StarFilled className='star-icon' />
                <StarFilled className='star-icon' />
                <StarFilled className='star-icon' />
                <StarTwoTone className='star-icon' />
              </Space>
            </span>
            <span>
              <Text strong> 24 reviews <RightOutlined style={{ fontSize: "10px" }} /> </Text>
            </span>
          </div>

          <div className="price">
            <Title> <span style={{ color: '#cccc' }}>$ </span> {product ? product.price : ""}</Title>
          </div>

          <div className="action-btns">
            <Button type='primary' size='large' style={{ width: '100%' }} onClick={buyProduct}> <ThunderboltFilled /> Buy Now </Button>
            <Button size='large' style={{ width: '100%' }} onClick={addToCart}  > <ShoppingCartOutlined /> Add to Cart </Button>
          </div>

          <div className="offers" style={{ marginTop: '20px' }}>
            <Title level={4}>Delivery Option</Title>
            <p><Text strong> <StarFilled style={{ color: '#aaa' }} /> 100%</Text> <Text>Original Product</Text></p>

            <p><Text strong> <HomeFilled style={{ color: '#aaa' }} /> webship prime</Text> <Text> product</Text></p>
            {
              product
                ? product.options.map(option => {
                  return (
                    <p><Text strong> <MoneyCollectOutlined style={{ color: '#aaa' }} /> {option}</Text></p>
                  )
                })
                : ""
            }
          </div>

          <div className="desc" style={{ marginTop: '15px' }}>
            <Title level={4}> Product Description </Title>
            <Paragraph
              ellipsis={{
                rows: 5,
                expandable: true,
                symbol: 'Read more'
              }}>
              {product ? product.info : ""}
            </Paragraph>
          </div>

        </div>

      </div>

      <div className="reviews-wrapper">
        <Title level={2}>Reviews (24)</Title>
        <List
          itemLayout="horizontal"
          size='large'
          dataSource={[
            {
              title: 'Ant Design Title 1',
              description: 'This is some reviewatque unde, cum rerum libero facere quidem porro repellendus nisi doloremque nobis!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos nam voluptas labore reiciendis itaque fugiat nemo enim eveniet atque unde, cum rerum libero facere quidem porro repellendus nisi doloremque nobis!'
            },
            {
              title: 'Ant Design Title 2',
              description: 'This is some review'
            },
            {
              title: 'Ant Design Title 3',
              description: 'This is some review'
            },
            {
              title: 'Ant Design Title 4',
              description: 'This is some review'
            },
          ]}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </StyledDiv >
  )
}

const StyledDiv = styled.div`
    margin: auto;
    max-width: 1444px;

  .product-wrapper{
    display: grid;
    padding: 60px;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
  }

  .reviews-wrapper{
    padding: 60px;
    margin-top: 60px;
    .ant-avatar{
      background-color: #aaaa !important;
      outline: 1px solid black !important;
    }
  }

  .star-icon{
    color: #4879ff;
  }

  .product-img-wrapper{
    display: flex;
    flex-direction: column;
    gap: 15px;

    img{
      width: inherit;
      height: inherit;
      object-fit: cover;
      transition: scale 0.3s;
    }

    .big-img-wrapper{
      width: 100%;
      height: auto;
      aspect-ratio: 16/9;
      overflow: hidden;
      border-radius: 15px;

      .ant-image{
        width: 100% !important;
      }
    }

    .small-img-container{
      width: 100%;
      height: auto;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 15px;
      

      .img-wrapper{
        min-width: 100px;
        width: 100%;
        height: 150px;
        overflow: hidden;
        border-radius: 10px;
        outline: 1px solid #ddd;
        cursor: pointer;

        &:hover > img{
          scale: 1.1;
        }
      }
    }
  }

  .product-desc-wrapper{
    display: flex;
    flex-direction: column;
    gap: 30px;

    .star-review{
      display: flex;
      gap: 15px;
      align-items: center;
    }

    .action-btns{
      display: flex;
      gap: 15px;
      max-width: 500px;
    }
  }

`