'use client'

import styled from 'styled-components';
import { Typography, Space, Button, Image, List, Avatar } from 'antd';
const { Title, Text } = Typography;
import { StarTwoTone, StarFilled, RightOutlined, ThunderboltFilled, ShoppingCartOutlined, MoneyCollectFilled, HomeFilled, MoneyCollectOutlined } from '@ant-design/icons';
import Paragraph from 'antd/es/typography/Paragraph';

const imgFallback: string = 'https://i.pinimg.com/1200x/7a/4b/a3/7a4ba30875e0de9567889866eb66bc4c.jpg';

export default function Product({ params }) {
  return (
    <StyledDiv>
      <div className="product-wrapper">

        <div className="product-img-wrapper">
          <div className="big-img-wrapper">
            <Image src="https://i.pinimg.com/1200x/5e/de/d1/5eded1fd24560c2b05764041a7aca767.jpg" />
          </div>
          <div className="small-img-container">
            <div className="img-wrapper">
              <img src="https://i.pinimg.com/1200x/5e/de/d1/5eded1fd24560c2b05764041a7aca767.jpg" />
            </div>
            <div className="img-wrapper">
              <img src="https://i.pinimg.com/1200x/5e/de/d1/5eded1fd24560c2b05764041a7aca767.jpg" />
            </div>
            <div className="img-wrapper">
              <img src="https://i.pinimg.com/1200x/5e/de/d1/5eded1fd24560c2b05764041a7aca767.jpg" />
            </div>
            <div className="img-wrapper">
              <img src="https://i.pinimg.com/1200x/5e/de/d1/5eded1fd24560c2b05764041a7aca767.jpg" />
            </div>
          </div>
        </div>

        <div className="product-desc-wrapper">
          <div className="title">
            <Title>Plush toys for babies</Title>
            <Text>ideal age 1 to 2 years, helps develop social and emotional growth, soft toys</Text>
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
            <Title> <span style={{ color: '#cccc' }}>$</span> 25.60</Title>
          </div>

          <div className="action-btns">
            <Button type='primary' size='large' style={{ width: '100%' }}> <ThunderboltFilled /> Buy Now </Button>
            <Button size='large' style={{ width: '100%' }}> <ShoppingCartOutlined /> Add to Cart </Button>
          </div>

          <div className="offers" style={{ marginTop: '20px' }}>
            <Title level={4}>Delivery Option</Title>
            <p><Text strong> <StarFilled style={{ color: '#aaa' }} /> 100%</Text> <Text>Original Product</Text></p>
            <p><Text strong> <MoneyCollectOutlined style={{ color: '#aaa' }} /> Pay On Delivery</Text> <Text> is available</Text></p>
            <p><Text strong> <HomeFilled style={{ color: '#aaa' }} /> 30 days</Text> <Text> return</Text></p>
          </div>

          <div className="desc" style={{ marginTop: '15px' }}>
            <Title level={4}> Product Description </Title>
            <Paragraph
              ellipsis={{
                rows: 5,
                expandable: true,
                symbol: 'Read more'
              }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis architecto dicta distinctio placeat voluptates aspernatur eum officia eaque. Similique, suscipit numquam? Delectus cum inventore quas voluptatem! Placeat dolor quisquam voluptates?
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos nam voluptas labore reiciendis itaque fugiat nemo enim eveniet atque unde, cum rerum libero facere quidem porro repellendus nisi doloremque nobis!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos nam voluptas labore reiciendis itaque fugiat nemo enim eveniet atque unde, cum rerum libero facere quidem porro repellendus nisi doloremque nobis!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos nam voluptas labore reiciendis itaque fugiat nemo enim eveniet atque unde, cum rerum libero facere quidem porro repellendus nisi doloremque nobis!
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