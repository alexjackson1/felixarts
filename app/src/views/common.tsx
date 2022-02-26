import styled from "@emotion/styled";

export const HeroLayout = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  background-color: white;

  & > *:first-of-type {
    max-width: 400px;
    margin: 1em;
  }
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;

  padding: 24px;
  border: solid 1px #dddddd;
  border-radius: 2px;
`;
