import { FacebookOutlined, InstagramOutlined, MailOutlined, TikTokOutlined } from "@ant-design/icons";
import { TbBrandShopee } from "react-icons/tb";
import { LuMapPin, LuPhone } from "react-icons/lu";
import Link from "next/link";

// type MenuItem = Required<MenuProps>['items'][number];

export const unauthenticatedRoutes = [
    {
      title: "Login",
      path: "/auth/login",
    },
    {
      title: "Signup",
      path: "/auth/signup",
    },
  ];
  
  export const routes = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Product",
      path: "/products"
    }
  ];
  
  export interface Item {
    key: string
    label: string
    icon?: string | React.ReactNode
    children?: Item[]
    type?: "group" | "divider"
    disabled?: boolean
    external?: boolean
    danger?: boolean
    path?: string
  }
  
  // Main navigation for header
  export const mainNavItems: Item[] = [
    {
      key: "/",
      label: "Home",
      icon: "home",
      path: "/"
    },
    {
      key: "shop",
      label: "Shop",
      icon: "shopping-bag",
      path: "/shop",
      children: [
        {
          key: "shop-featured",
          label: "Featured Categories",
          type: "group",
          children: [
            {
              key: "/shop/women",
              label: "Women",
              path: "/shop/women",
            },
            {
              key: "/shop/men",
              label: "Men",
              path: "/shop/men",
            },
          ],
        },
        {
          key: "shop-categories",
          label: "All Categories",
          type: "group",
          children: [
            {
              key: "/shop/accessories",
              label: "Accessories",
              path: "/shop/accessories",
            },
            {
              key: "/shop/footwear",
              label: "Footwear",
              path: "/shop/footwear",
            },
            {
              key: "/shop/denim",
              label: "Vintage Denim",
              path: "/shop/denim",
            },
            {
              key: "/shop/outerwear",
              label: "Outerwear",
              path: "/shop/outerwear",
            },
          ],
        },
      ],
    },
    {
      key: "collections",
      label: "Collections",
      icon: "star",
      path: "/collections",
      children: [
        {
          key: "collections-featured",
          label: "Featured Collections",
          type: "group",
          children: [
            {
              key: "/collections/summer",
              label: "Summer Collection",
              path: "/collections/summer",
            },
            {
              key: "/collections/classics",
              label: "Vintage Classics",
              path: "/collections/classics",
            },
          ],
        },
        {
          key: "collections-all",
          label: "All Collections",
          type: "group",
          children: [
            {
              key: "/collections/limited",
              label: "Limited Edition",
              path: "/collections/limited",
            },
            {
              key: "/collections/new",
              label: "New Arrivals",
              path: "/collections/new",
            },
            {
              key: "/collections/retro",
              label: "Retro Essentials",
              path: "/collections/retro",
            },
          ],
        },
      ],
    },
    {
      key: "sale",
      label: "Sale",
      icon: "tag",
      path: "/sale",
      children: [
        {
          key: "sale-hot",
          label: "Hot Deals",
          type: "group",
          children: [
            {
              key: "/sale/flash",
              label: "Flash Sale",
              path: "/sale/flash",
            },
            {
              key: "/sale/clearance",
              label: "Clearance",
              path: "/sale/clearance",
            },
          ],
        },
        {
          key: "sale-offers",
          label: "Special Offers",
          type: "group",
          children: [
            {
              key: "/sale/bundles",
              label: "Bundle Deals",
              path: "/sale/bundles",
            },
            {
              key: "/sale/seasonal",
              label: "Seasonal Offers",
              path: "/sale/seasonal",
            },
          ],
        },
      ],
    },
    {
      key: "/about",
      label: "About",
      icon: "info-circle",
      path: "/about",
    },
  ]
  
  // Footer quick links
  export const footerQuickLinks = [
    {
      key: "footer-home",
      label: <Link href=''>Home</Link>,
    },
    {
      key: "footer-shop",
      label: <Link href=''>Shop</Link>
    },
    {
      key: "footer-collections",
      label: <Link href=''>Collections</Link>
    },
    {
      key: "footer-about",
      label: <Link href=''>About Us</Link>,
    },
    {
      key: "footer-contact",
      label: <Link href=''>Contact</Link>,
    },
  ]
  
  // Footer support and help links
  export const footerSupportLinks = [
    {
      key: "/shipping",
      label: <Link href=''>Shipping Policy</Link>,
    },
    {
      key: "/returns",
      label: <Link href=''>Return & Exchanges</Link>,
    },
    {
      key: "/size-guide",
      label: <Link href=''>Size Guide</Link>,
    },
    {
      key: "/faq",
      label: <Link href=''>FAQs</Link>,
    },
    {
      key: "/privacy",
      label: <Link href=''>Privacy Policy</Link>,
    },
    {
      key: "/terms",
      label: <Link href=''>Term Of Service</Link>,
    },
  ]
  
  // Social media links
  export const socialMediaLinks = [
    {
      key: "facebook",
      icon: <Link href=''><FacebookOutlined style={{ fontSize: 25 }} /></Link>,
    },
    {
      key: "instagram",
      icon: <Link href=''><InstagramOutlined style={{ fontSize: 25 }}/></Link>,
    },
    {
      key: "tiktok",
      icon: <Link href=''><TikTokOutlined style={{ fontSize: 25 }}/></Link>,
    },
    {
      key: "shopee",
      icon: <Link href=''><TbBrandShopee style={{ fontSize: 25 }}/></Link>,
    }
  ]
  
  // Admin navigation (if needed)
  export const adminNavItems: Item[] = [
    {
      key: "/admin",
      label: "Dashboard",
      icon: "dashboard",
      path: "/admin",
    },
    {
      key: "/admin/products",
      label: "Products",
      icon: "package",
      path: "/admin/products",
    },
    {
      key: "/admin/orders",
      label: "Orders",
      icon: "shopping-cart",
      path: "/admin/orders",
    },
    {
      key: "/admin/customers",
      label: "Customers",
      icon: "users",
      path: "/admin/customers",
    },
    {
      key: "/admin/analytics",
      label: "Analytics",
      icon: "bar-chart",
      path: "/admin/analytics",
    },
    {
      key: "/admin/settings",
      label: "Settings",
      icon: "settings",
      path: "/admin/settings",
    },
  ]
  
  // Contact information (not menu items but useful for footer)
  export const contactInfo = [
    {
      key: "address",
      label: "Address",
      value: "20 Thuan An 4, Da Nang City, Vietnam",
      icon: <LuMapPin />,
    },
    {
      key: "phone",
      label: "Phone",
      value: "(+84) 0769779154",
      icon: <LuPhone />,
    },
    {
      key: "email",
      label: "Email",
      value: "thanghuynh.271203@gmail.com",
      icon: <MailOutlined />,
    }
  ]
  
  export {
    mainNavItems as headerNav,
    footerQuickLinks as footerLinks,
    footerSupportLinks as supportLinks,
    socialMediaLinks as socialLinks,
    adminNavItems as adminMenu,
  }
  