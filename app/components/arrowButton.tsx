import styled from "styled-components";
import { Button } from "antd";

export const ArrowButton = styled(Button)<{ isDarkMode: boolean }>`
  &&& {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    box-shadow: none;
    border: 1px solid ${({ isDarkMode }) => (isDarkMode ? "#3f3f46" : "#e5e7eb")};
    color: ${({ isDarkMode }) => (isDarkMode ? "#F4F4F5" : "#27272A")};
    background-color: ${({ isDarkMode }) =>
      isDarkMode ? "rgba(39, 39, 39, 0.66)" : "#FFFFFF"};

    &:hover {
      background-color: ${({ isDarkMode }) =>
        isDarkMode ? "#3F3F46" : "#F3F4F6"};
      color: ${({ isDarkMode }) => (isDarkMode ? "#F4F4F5" : "#27272A")};
    }
  }
`;