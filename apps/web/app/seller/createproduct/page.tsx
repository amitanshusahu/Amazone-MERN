'use client'

import styled from 'styled-components';
import { Typography, Space, Button, Input, InputNumber, Checkbox, message } from 'antd';
const { Title, Text } = Typography;
import TextArea from 'antd/es/input/TextArea';
import { ChangeEvent, useEffect, useState } from 'react';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { CreateProductParams } from 'types'
import { TOKEN, USERNAME, createproducturl, loadSecrets, meurl } from 'config';
import Fetch from 'fetch';
import { useRouter } from 'next/navigation';

const imgFallback: string = 'https://i.pinimg.com/1200x/7a/4b/a3/7a4ba30875e0de9567889866eb66bc4c.jpg';

export default function Product({ params }) {

  // too lazy to set up a state mannagement 
  const [paymentOption, setPaymentOptions] = useState([]);
  const [offers, setOffers] = useState([]);
  const [input, setInput] = useState({
    title: "",
    description: "",
    info: "",
  });
  const [img1, setImg1] = useState(imgFallback);
  const [img2, setImg2] = useState(imgFallback);
  const [img3, setImg3] = useState(imgFallback);
  const [img4, setImg4] = useState(imgFallback);
  const [price, setPrice] = useState<number>();
  const [messageApi, contextHolder] = message.useMessage();
  const [username, setUsername] = useState();
  const router = useRouter();

  const error = (content: string) => {
    messageApi.open({
      type: 'error',
      content: content,
    });
  };

  useEffect(() => {
    async function getUsername() {
      const api = new Fetch({}, meurl);
      const res = await api.get();
      if('status' in res){
        if (res.status){
          setUsername(res.username);
        }
        else error(res.msg);
      }
    }
    getUsername();
  }, []);

  const getCompressedImage = async (imgString: string, size: number): Promise<string> => {

    // if greated than 500kb compress
    if (imgString.length > 500000) {
      const canvas = document.createElement('canvas');
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

      // set the canvas dimensions compressed image size
      const maxWidth = size;
      const maxHeight = size;

      const image = new Image();
      image.src = imgString;

      // wait for the image to load
      await new Promise((resolve) => {
        image.onload = resolve;
      });

      // calculate the new dimensions based on the maximum size while maintaining the aspect ratio
      // magic from internet
      let newWidth = image.width;
      let newHeight = image.height;

      if (newWidth > maxWidth) {
        const ratio = maxWidth / newWidth;
        newWidth = maxWidth;
        newHeight = newHeight * ratio;
      }

      if (newHeight > maxHeight) {
        const ratio = maxHeight / newHeight;
        newHeight = maxHeight;
        newWidth = newWidth * ratio;
      }

      // set the canvas dimensions to the new dimensions
      canvas.width = newWidth;
      canvas.height = newHeight;

      // draw the image onto the canvas with the new dimensions
      ctx.drawImage(image, 0, 0, newWidth, newHeight);

      // get the compressed image as a base64-encoded data URL
      // quality range => 1 >= quality >= 0  
      const compressedImage = canvas.toDataURL('image/jpg', 1);

      return compressedImage;
    }

    return imgString;
  }

  const handelImage = (setImg: Function): void => {
    //create a file input dynamically
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/jpg';

    // define a onchange to read and show the file
    fileInput.onchange = (e: Event) => {
      if ('files' in e.target) {
        const file: File = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            setImg(reader.result);
          }
        }
      } else error('Target does\'nt have files');
    };

    // sumulate a click event
    fileInput.click();
  }

  const handelPaymentOptionChange = (checkedValue: CheckboxValueType[]) => {
    setPaymentOptions(checkedValue);
  }

  const handelOffersChange = (checkedValue: CheckboxValueType[]) => {
    setOffers(checkedValue);
  }

  const handelInputChange = (e: ChangeEvent) => {
    if ("name" in e.target && "value" in e.target) {
      if (typeof e.target.name == "string")
        setInput({ ...input, [e.target.name]: e.target.value });
      else error('name is not a string');
    } else error('name or value is not present in target');
  }

  const handelPrice = (value: number) => {
    setPrice(value);
  }

  const handelSubmit = async () => {
    const { title, description, info } = input;
    const options = [...paymentOption, ...offers];
    const payload: CreateProductParams = {
      username,
      title,
      description,
      info,
      price,
      options,
      img1,
      img2,
      img3,
      img4
    }

    if (!title || !username) {
      error('Inputs are not stored properly');
      return
    }

    const api = new Fetch(payload, createproducturl);
    const res = await api.postAuthjson();
    if ('status' in res) {
      if (res.status) {
        alert('Product Registered');
        router.push('../../');
      }
      else {
        if (typeof res.msg == 'string') {
          error(res.msg);
        }
      }
    }
  }

  return (
    <StyledDiv>
      {contextHolder}
      <div className="product-wrapper">

        <div className="product-img-wrapper">
          <div className="center">
            <div className="img-wrapper" onClick={() => handelImage(setImg1)}><img src={img1} alt="product image" /></div>
            <div className="img-wrapper" onClick={() => handelImage(setImg2)}><img src={img2} alt="product image" /></div>
            <div className="img-wrapper" onClick={() => handelImage(setImg3)}><img src={img3} alt="product image" /></div>
            <div className="img-wrapper" onClick={() => handelImage(setImg4)}><img src={img4} alt="product image" /></div>
          </div>
        </div>

        <div className="product-desc-wrapper">
          <Title>Register Product</Title>
          <Input
            placeholder='Title of the product'
            name='title'
            prefix='Title: '
            required={true}
            style={{ fontWeight: 'bold' }}
            size='large'
            allowClear
            onChange={handelInputChange}
          />
          <TextArea
            placeholder="a short description of the product..."
            showCount
            name='description'
            maxLength={200}
            style={{
              height: 100,
              resize: 'none',
            }}
            onChange={handelInputChange}
          />
          <InputNumber
            placeholder='What should be the price of the product..'
            prefix='Price: '
            required={true}
            style={{ fontWeight: 'bold' }}
            size='large'
            addonAfter="$"
            onChange={handelPrice}
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
              name='info'
              style={{
                height: 200,
                resize: 'none',
              }}
              onChange={handelInputChange}
            />
          </Space>
          <Button size='large' type='primary' style={{ width: 300 }} onClick={handelSubmit}> Register Product </Button>
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