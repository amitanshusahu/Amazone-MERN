'use client'

import styled from 'styled-components'
import { Typography, Steps } from "antd";
const { Title, Text, Paragraph } = Typography;
import { StarFilled, StarTwoTone } from "@ant-design/icons";
import NavBar from 'ui/NavBar'


export default function Status() {

  return (
    <StyledDiv>
      <NavBar />

      <main>
        <Steps
          direction="vertical"
          current={2}
          items={[
            {
              title: 'Purchaged',
              description: 'Product has been purchased',
            },
            {
              title: 'Out For Shipping',
              description: 'What is a paragraph? Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph.',
            },
            {
              title: 'Waiting',
              description: "What is a paragraph? Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length",
            },
            {
              title: 'Out For Order',
              description: "You will recive after a day",
            },
            {
              title: 'Delivered',
              description: "Review the product",
              subTitle: "10 Agust 2023 expected"
            },
          ]}
        />
      </main>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  padding: 60px;
  max-width: 1920px;
  margin: auto;

  main {
    margin-top: 60px;
    max-width: 1000px;
  }

  
`