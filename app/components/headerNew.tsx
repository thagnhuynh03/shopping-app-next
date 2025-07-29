"use client"

import { useContext } from "react"
import { Dropdown, Menu, Button, Badge, Drawer, Space } from "antd"
import {
  SearchOutlined,
  ShoppingOutlined,
  UserOutlined,
  HeartOutlined,
  MenuOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons"
import { useState } from "react"
import Link from "next/link"
import { ThemeContext } from "../theme-context"
import { AuthContext } from "../auth/auth-context"
import { useRouter } from "next/navigation" // Import useRouter
import { SearchBar } from "./searchBar"

interface HeaderProps {
  logout: () => Promise<void>;
}

export function Header({ logout }: HeaderProps) {
  const isAuthenticated = useContext(AuthContext)
  const { isDarkMode, toggleTheme } = useContext(ThemeContext)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const router = useRouter()

  const accountMenuItems = [
    {
      key: "profile",
      label: <Link href="/profile">Profile</Link>
    },
    {
      key: "orders",
      label: <Link href="/order">Order</Link>
    },
    {
      key: "setting",
      label: <Link href="/setting">Setting</Link>
    },
    {
      key: "logout",
      label: "Logout",
      onClick: async() =>{
        await logout()
      }
    },
  ]

  // Dropdown menu items
  const shopMenuItems = [
    {
      key: "women",
      label: (
        <Link href="#women" style={{ fontWeight: "bold" }}>
          Women
        </Link>
      ),
    },
    {
      key: "men",
      label: (
        <Link href="#men" style={{ fontWeight: "bold" }}>
          Men
        </Link>
      ),
    },
    {
      key: "accessories",
      label: <Link href="#accessories">Accessories</Link>,
    },
    {
      key: "footwear",
      label: <Link href="#footwear">Footwear</Link>,
    },
    {
      key: "denim",
      label: <Link href="#denim">Vintage Denim</Link>,
    },
    {
      key: "outerwear",
      label: <Link href="#outerwear">Outerwear</Link>,
    },
  ]

  const collectionsMenuItems = [
    {
      key: "summer",
      label: (
        <Link href="#summer" style={{ fontWeight: "bold" }}>
          Summer Collection
        </Link>
      ),
    },
    {
      key: "classics",
      label: (
        <Link href="#classics" style={{ fontWeight: "bold" }}>
          Vintage Classics
        </Link>
      ),
    },
    {
      key: "limited",
      label: <Link href="#limited">Limited Edition</Link>,
    },
    {
      key: "new",
      label: <Link href="#new">New Arrivals</Link>,
    },
    {
      key: "retro",
      label: <Link href="#retro">Retro Essentials</Link>,
    },
  ]

  const saleMenuItems = [
    {
      key: "flash",
      label: (
        <Link href="#flash" style={{ fontWeight: "bold" }}>
          Flash Sale
        </Link>
      ),
    },
    {
      key: "clearance",
      label: (
        <Link href="#clearance" style={{ fontWeight: "bold" }}>
          Clearance
        </Link>
      ),
    },
    {
      key: "bundles",
      label: <Link href="#bundles">Bundle Deals</Link>,
    },
    {
      key: "seasonal",
      label: <Link href="#seasonal">Seasonal Offers</Link>,
    },
  ]

  // Mobile menu items
  const mobileMenuItems = [
    {
      key: "home",
      label: <Link href="/">Home</Link>,
    },
    {
      key: "shop",
      label: "Shop",
      children: shopMenuItems,
    },
    {
      key: "collections",
      label: "Collections",
      children: collectionsMenuItems,
    },
    {
      key: "sale",
      label: "Sale",
      children: saleMenuItems,
    },
    {
      key: "about",
      label: <Link href="#">About</Link>,
    },
  ]

  const headerStyle = {
    backgroundColor: isDarkMode ? "#18181B" : "#FFFFFF",
    borderBottom: `1px solid ${isDarkMode ? "#27272A" : "#E5E7EB"}`,
  }

  const drawerStyle = {
    backgroundColor: isDarkMode ? "#18181b" : "#FFFFFF",
  }

  return (
    <header className="w-full sticky top-0 z-50" style={headerStyle}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <Button className="lg:!hidden" type="text" icon={<MenuOutlined />} onClick={() => setIsDrawerOpen(true)} />
          {/* Logo */}
          <div className="text-center lg:text-left">
            <Link href="/">
              <h1 className="text-2xl md:text-3xl font-bold">
                <span style={{ color: isDarkMode ? "#fbbf24" : "#92400e" }}>Retro</span>
                <span style={{ color: isDarkMode ? "#d4d4d8" : "#374151" }}>Threads</span>
              </h1>
              <p className="text-xs italic" style={{ color: isDarkMode ? "#a1a1aa" : "#6b7280" }}>
                Vintage Style, Modern Comfort
              </p>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <Space size="large" style={{ fontFamily: "serif" }}>
              <Link href="/">Home</Link>
              <Dropdown menu={{ items: shopMenuItems }} trigger={["hover", "click"]} placement="bottomLeft">
                <Button type="text" className="hover:!text-amber-700 transition-colors" style={{ fontFamily: "serif" }}>
                  Shop
                </Button>
              </Dropdown>
              <Dropdown menu={{ items: collectionsMenuItems }} trigger={["hover", "click"]} placement="bottomLeft">
                <Button type="text" className="transition-colors" style={{ fontFamily: "serif" }}>
                  Collections
                </Button>
              </Dropdown>
              <Dropdown menu={{ items: saleMenuItems }} trigger={["hover", "click"]} placement="bottomLeft">
                <Button type="text" className="hover:text-amber-700 transition-colors" style={{ fontFamily: "serif" }}>
                  Sale
                </Button>
              </Dropdown>
              <Link href="/about">About</Link>
            </Space>
          </nav>
          {/* Icons */}
          <Space>
            <Button
              type="text"
              icon={
                isDarkMode ? (
                  <SunOutlined style={{ fontSize: "18px" }} />
                ) : (
                  <MoonOutlined style={{ fontSize: "18px" }} />
                )
              }
              onClick={toggleTheme}
            />
            <Button
              type="text"
              icon={<SearchOutlined style={{ fontSize: "18px" }} />}
              onClick={() => setShowSearchBar(!showSearchBar)}
            />
            {isAuthenticated && <Button type="text" icon={<HeartOutlined style={{ fontSize: "18px" }} />} />}
            {isAuthenticated && (
              <Badge count={3} size="small">
                <Button type="text" icon={<ShoppingOutlined style={{ fontSize: "18px" }} />} />
              </Badge>
            )}
            {isAuthenticated ? (
              <Dropdown menu={{ items: accountMenuItems}} trigger={["click", "hover"]} placement="bottomRight" arrow>
                <Button type="text" icon={<UserOutlined style={{ fontSize: "18px" }} />} />
              </Dropdown>
            ) : (
              <Button
                type="text"
                icon={<UserOutlined style={{ fontSize: "18px" }} />}
                onClick={() => router.push("/login")}
              />
            )}
          </Space>
        </div>
      </div>
      {/* Mobile Navigation Drawer */}
      <Drawer
        title={
          <div style={{ fontFamily: "serif" }}>
            <span style={{ color: isDarkMode ? "#fbbf24" : "#92400e" }}>Retro</span>
            <span style={{ color: isDarkMode ? "#d4d4d8" : "#374151" }}>Threads</span>
          </div>
        }
        placement="left"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width={280}
        styles={{
          wrapper: drawerStyle,
          header: drawerStyle,
          body: { ...drawerStyle, padding: 0 },
        }}
      >
        <Menu
          mode="inline"
          items={mobileMenuItems}
          style={{
            backgroundColor: isDarkMode ? "#18181b" : "#FFFFFF",
            color: isDarkMode ? "#d4d4d8" : "#374151",
            fontFamily: "serif",
            border: "none",
          }}
        />
      </Drawer>
      {/* Search Bar */}
      <SearchBar isOpen={showSearchBar} onClose={() => setShowSearchBar(false)} isDarkMode={isDarkMode} />
    </header>
  )
}
