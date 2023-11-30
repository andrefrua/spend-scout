import { Palette, styled } from "@mui/material";
import { VerticalNavItemColor } from "components/layouts/MainLayout/VerticalNav/VerticalNavItem/VerticalNavItem.models";

// Define an interface for your custom props
interface LoadingProps {
  position?: "absolute" | "relative";
  color?: keyof Palette;
}

const Loading = styled("div")<LoadingProps>`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: ${props => props.position || "absolute"};

  :after {
    content: " ";
    display: block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 3px solid #fff;
    border-color: ${props =>
        props.theme.palette[props.color || VerticalNavItemColor.LIGHT].main}
      transparent
      ${props =>
        props.theme.palette[props.color || VerticalNavItemColor.LIGHT].main ||
        "#fff"}
      transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
