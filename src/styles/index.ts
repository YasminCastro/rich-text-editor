import styled from "styled-components";

export const Wrapper = styled.div`
  background: #eeeeee;
  height: 100%;
  width: 100%;
  position: absolute;
`;

export const Container = styled.div`
  background: #ffffff;
  margin: auto;
  margin-top: 58px;
  max-width: 42em;
  min-height: 16em;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.2);
`;

export const Toolbar = styled.div`
  border-bottom: 2px solid rgb(238, 238, 238);
  padding: 16px 16px 10px 16px;
  button {
    margin-right: 12px;
  }
`;
