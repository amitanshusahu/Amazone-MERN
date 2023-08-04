'use client'

import styled from 'styled-components';
import { Typography, Space, Button, Input, InputNumber, Checkbox } from 'antd';
const { Title, Text } = Typography;
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

const imgFallback: string = 'https://i.pinimg.com/1200x/7a/4b/a3/7a4ba30875e0de9567889866eb66bc4c.jpg';

export default function Product({ params }) {

  // too lazy to set up a state mannagement 
  const [paymentOption, setPaymentOptions] = useState([]);
  const [offers, setOffers] = useState([]);
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");


  const handelPaymentOptionChange = (checkedValue: CheckboxValueType[]) => {
    setPaymentOptions(checkedValue);
  }

  const handelOffersChange = (checkedValue: CheckboxValueType[]) => {
    setOffers(checkedValue);
  }

  return (
    <StyledDiv>
      <div className="product-wrapper">

        <div className="product-img-wrapper">
          <div className="center">
            <div className="img-wrapper"><img src="" alt="product image" /></div>
            <div className="img-wrapper"><img src="" alt="product image" /></div>
            <div className="img-wrapper"><img src="" alt="product image" /></div>
            <div className="img-wrapper"><img src="" alt="product image" /></div>
          </div>
        </div>

        <div className="product-desc-wrapper">
          <Title>Register Product</Title>
          <Input
            placeholder='Title of the product'
            name='username'
            prefix='Title: '
            required={true}
            style={{ fontWeight: 'bold' }}
            size='large'
            allowClear
          // onChange={handelInputChange}
          />
          <TextArea
            placeholder="a short description of the product..."
            showCount
            maxLength={200}
            style={{
              height: 100,
              resize: 'none',
            }}
          // onChange={onChange}
          />
          <InputNumber
            placeholder='What should be the price of the product..'
            name='username'
            prefix='Price: '
            required={true}
            style={{ fontWeight: 'bold' }}
            size='large'
            addonAfter="$"
          // onChange={handelInputChange}
          />
          <Space direction='vertical'>
            <Text strong> Payment Options </Text>
            <Checkbox.Group
              options={[
                {
                  label: 'EMI Available',
                  value: 'EMI Available',
                },
                {
                  label: 'Pay On Delivery',
                  value: 'Pay On Delivery',
                },
                {
                  label: 'Pay First',
                  value: 'Pay First',
                },
              ]}
              onChange={handelPaymentOptionChange}
            />
          </Space>
          <Space direction='vertical'>
            <Text strong> Offers </Text>
            <Checkbox.Group
              options={[
                {
                  label: 'Return Available',
                  value: '7 days Return',
                },
                {
                  label: 'Replace Available',
                  value: '30 days Replace',
                },
              ]}
              onChange={handelOffersChange}
            />
          </Space>
          <Space direction='vertical'>
            <Text strong> Product Description </Text>
            <TextArea
              placeholder="write about the products, its features etc.."
              showCount
              maxLength={1000}
              style={{
                height: 200,
                resize: 'none',
              }}
            // onChange={onChange}
            />
          </Space>
          <Button size='large' type='primary' style={{ width: 300 }}> Register Product </Button>
        </div>

      </div>
    </StyledDiv >
  )
}

const StyledDiv = styled.div`
    margin: auto;
    max-width: 1444px;

    input {
			font-size: 15px !important;
			padding: 10px !important;
		}

  .product-wrapper{
    display: grid;
    padding: 60px;
    grid-template-columns: 1fr 2fr;
    gap: 60px;
    
    
  }

  .product-img-wrapper{
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;

    .center{
      display: flex;
      flex-direction: column;
      gap: 20px;

      .img-wrapper{
        background-color: #ebebeb;
        width: 150px;
        height: 150px;
        overflow: hidden;
        border-radius: 15px;
        border: 1px solid #dddd;

        img{
          width: inherit;
          height: inherit;
          object-fit: cover;
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