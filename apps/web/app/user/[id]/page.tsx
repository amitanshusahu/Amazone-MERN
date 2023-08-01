"use client"

import styled from 'styled-components';

export default function User({params}) {
  return(
      <StyldeDiv>
        {params.id}
      </StyldeDiv>
      )
}

const StyldeDiv = styled.div`
color: red;
`
