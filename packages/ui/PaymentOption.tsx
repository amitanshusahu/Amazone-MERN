import styled from 'styled-components';
import { Radio, Input, InputNumber, Space, Typography, RadioChangeEvent } from 'antd'
import { useState } from 'react';
const { Text } = Typography
export default function PaymentOption() {

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <StyledDiv>
      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical">
          <Radio value={1}>Emi</Radio>
          <Radio value={2}>Pay On Delivery</Radio>
          <Radio value={3}>
            Pay Now
            {value === 3 ? (
              <Input
                placeholder='card number..'
                style={{
                  width: 100,
                  marginLeft: 10,
                }}
              />
            ) : null}
          </Radio>
        </Space>
      </Radio.Group>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
`