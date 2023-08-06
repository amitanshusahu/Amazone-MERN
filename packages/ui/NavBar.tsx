import { Input, Dropdown, Space, Typography, Button, message } from 'antd';
const { Search } = Input;
import { DownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import Fetch from 'fetch';
import { BASE_URI, issellerurl, meurl } from 'config'

const buyerstems: any = [
  {
    label: <a href="/buyer/orders">My Orders</a>,
    key: '0',
  },
  {
    label: <a href="/buyer/orders">Past Orders</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: 'Become a seller',
    key: '3',
  },
];

const selleritems: any = [
  {
    label: <a href="/seller/orders">Pending Orders</a>,
    key: '0',
  },
  {
    label: <a href="/seller/createproduct">Register Products</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: 'Become a Buyer',
    key: '3',
  },
];


export default function NavBar() {

  const [messageApi, contextHolder] = message.useMessage();
  const [username, setUsername] = useState();
  const [isSeller, setSeller] = useState(false);

  const error = (content: string) => {
    messageApi.open({
      type: 'error',
      content: content,
    });
  };

  const onSearch = (value: string) => {
    console.log(value);
  }

  useEffect(() => {
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

    async function getisSeller() {
      const api = new Fetch({}, issellerurl);
      const res = await api.get();
      if ("status" in res && typeof res.status == 'boolean') setSeller(res.status);
      console.log(res);
    }
    getisSeller();
    getUsername();
  }, [])

  return (
    <StyledDiv>
      <div className="logo" onClick={() => location.href = `${window.location.origin}`}>
        <img src="https://i.imgur.com/vyyaxvX.png" alt="logo" />
      </div>
      <div className="search">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          allowClear
          size='large'
          style={{ width: 500 }}
        />
      </div>
      <div className="action">
        <Space size='large'>
          {
            isSeller
              ? <Dropdown
                menu={{
                  items: selleritems,
                }}
                trigger={['click']}
              >
                <Button size='large' onClick={(e) => e.preventDefault()}>
                  <Space size='large'>
                    <Typography.Text>Orders</Typography.Text>
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
              : <Dropdown
                menu={{
                  items: buyerstems,
                }}
                trigger={['click']}
              >
                <Button size='large' onClick={(e) => e.preventDefault()}>
                  <Space size='large'>
                    <Typography.Text>Orders</Typography.Text>
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
          }
          {
            isSeller ? "" : <ShoppingCartOutlined style={{ fontSize: 30, cursor: 'pointer' }} onClick={() => location.href=`${window.location.origin}/cart`}/>
          }
        </Space>
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo img{
    width: 120px;
  }
`