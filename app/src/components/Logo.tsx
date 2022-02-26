import styled from "@emotion/styled";
import { ReactComponent as Cat } from "../assets/img/cat_black.svg";

const StyledCat = styled(Cat)`
  width: 150px;
  padding-right: 30px;
`;

function Logo() {
  return <StyledCat className="felixarts-logo" />;
}

export default Logo;
