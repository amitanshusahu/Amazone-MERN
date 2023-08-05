import { Input, Dropdown, Space, Typography, Button, message} from 'antd';
const { Search } = Input;
import { DownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import Fetch from 'fetch';
import { meurl } from 'config'

const selleritems: any = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];


export default function NavBar() {

  const [messageApi, contextHolder] = message.useMessage();
  const [username, setUsername] = useState();

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
      if('status' in res){
        if (res.status){
          setUsername(res.username);
        }
        else error(res.msg);
      }
    }
    getUsername();
  }, [])

  return (
    <StyledDiv>
      <div className="logo">
        <img src="https://i.imgur.com/vyyaxvX.png" alt="logo" />
      </div>
      <div className="search">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          allowClear
          size='large'
          style={{width: 500}}
        />
      </div>
      <div className="action">
        <Space size='large'>
          <Dropdown
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
          <ShoppingCartOutlined style={{fontSize: 30, cursor: 'pointer'}} />
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