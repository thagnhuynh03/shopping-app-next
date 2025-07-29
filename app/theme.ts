import { theme } from 'antd';

export const lightTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorBgBase: '#FFFFFF',
    colorTextBase: '#27272A',
    colorPrimary: "#F59E0B",
    colorLink: '#27272A',
    colorLinkHover: '#B4530B'
  },
  components:{
    Layout: {
      headerBg: '#FFFFFF'
    },
    Button: {
      textTextHoverColor: "#B4530B",
      textTextColor: '#27272A',
      textHoverBg: 'rgba(0,0,0,0)',
      borderRadius: 0
    },
    Menu: {
      padding: 8
    }
  }
};

export const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorBgBase: '#18181B',
    colorTextBase: '#F4F4F5',
    colorPrimary: "#D97706",
    colorLink: '#F4F4F5',
    colorLinkHover: '#B4530B'
  },
  components:{
    Layout: {
      headerBg: '#18181B'
    },
    Button: {
      textTextHoverColor: "#B4530B",
      textTextColor: '#F4F4F5',
      textHoverBg: 'rgba(0,0,0,0)',
      borderRadius: 0
    },
    Menu: {
      padding: 8
    }
  }
}