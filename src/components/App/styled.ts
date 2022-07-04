import styled from "styled-components";

export const SignInButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px 20px;
  background-color: transparent;
  border: 2px solid #61dafb;
  border-radius: 14px;
  color: #61dafb;
  font-weight: 600;
  cursor: pointer;

  & {
    transition: transform 0.2s linear;
    transform: scale(1);
  }
  &:hover {
    transition: transform 0.2s linear;
    transform: scale(1.03);
  }
`;

export const MintButton = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  border: 2px solid #61dafb;
  border-radius: 14px;
  color: #61dafb;
  font-weight: 600;
  cursor: pointer;

  font-size: calc(10px + 2vmin);

  & {
    transition: transform 0.2s linear;
    transform: scale(1);
  }
  &:hover {
    transition: transform 0.2s linear;
    transform: scale(1.03);
  }
`;
