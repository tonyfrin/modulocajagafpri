import React from "react"
import { keyframes } from "styled-components";
import styled from "styled-components";

const Loading = () => (
  <>
    <main className="gs-main-loading">
      <Spinner className="gs-spinner"/>
    </main>
  </>


)

export default Loading

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Spinner = styled.div`
  animation: ${spin} 2s linear infinite;
`