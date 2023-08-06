import styled from 'styled-components';
import { Input, InputNumber, Space, Typography } from 'antd'
const { Text } = Typography
export default function DelivryForm() {
  return (
    <StyledDiv>
      <Input
        placeholder='Your Name..'
        name='name'
        prefix='Name: '
        required={true}
        style={{ fontWeight: 'bold' }}
        size='large'
        allowClear
      // onChange={handelInputChange}
      />
      <Input
        placeholder='Adress..'
        name='adress'
        prefix='Adress: '
        required={true}
        style={{ fontWeight: 'bold' }}
        size='large'
        allowClear
      // onChange={handelInputChange}
      />
      <Space>
        <Input
          placeholder='Your City..'
          name='city'
          prefix='City: '
          required={true}
          style={{ fontWeight: 'bold' }}
          size='large'
          allowClear
        // onChange={handelInputChange}
        />
        <InputNumber
          placeholder='00000..'
          prefix='Zipcode: '
          required={true}
          style={{ fontWeight: 'bold' }}
          size='large'
          addonAfter="*"
          // onChange={handelPrice}
        />
      </Space>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
`