"use client"

import { useContext } from "react"
import { Row, Col, Typography, Space, Divider } from "antd"
import { ThemeContext } from "../theme-context"
import { contactInfo, footerQuickLinks, footerSupportLinks, socialMediaLinks } from "../constants/routes"

const { Title, Text } = Typography

export default function Footer() {
  const { isDarkMode } = useContext(ThemeContext)

  const footerStyle = {
    backgroundColor: isDarkMode ? "#27272a" : "#F4F4F4",
    padding: "48px 0",
  }

  return (
    <footer style={footerStyle} className="mt-10">
      <div className="container mx-auto px-4">
        <Row gutter={[32, 32]}>
          {/* About Section */}
          <Col xs={24} md={12} lg={6}>
            <Title
              level={3}
              style={{ fontFamily: "serif", marginBottom: "16px" }}
            >
              Retro Threads
            </Title>
            <Text
              style={{
                fontSize: "14px",
                display: "block",
                marginBottom: "16px",
              }}
            >
              Curating timeless vintage pieces for the modern wardrobe since 1997. Our mission is to bring sustainable
              fashion choices while celebrating the craftsmanship of the past.
            </Text>
            <nav>
              <ul style={{ display: "flex", gap: 3, listStyle: "none", padding: 0, margin: 0 }}>
                {socialMediaLinks.map((item) => (
                  <li key={item.key} style={{ marginBottom: 8, marginRight: 8 }}>
                    {item.icon}
                  </li>
                ))}
              </ul>
            </nav>
          </Col>

          {/* Quick Links Section */}
          <Col xs={24} md={12} lg={6}>
            <Title
              level={3}
              style={{ fontFamily: "serif", marginBottom: "16px" }}
            >
              Quick Links
            </Title>
            <nav>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {footerQuickLinks.map((item) => (
                  <li key={item.key} style={{ marginBottom: 8 }}>
                    {item.label}
                  </li>
                ))}
              </ul>
            </nav>
          </Col>

          {/* Help & Information Section */}
          <Col xs={24} md={12} lg={6}>
            <Title
              level={3}
              style={{ fontFamily: "serif", marginBottom: "16px" }}
              className="hover:!bg-transparent"
            >
              Help & Information
            </Title>
            <nav>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {footerSupportLinks.map((item) => (
                  <li key={item.key} style={{ marginBottom: 8 }}>
                    {item.label}
                  </li>
                ))}
              </ul>
            </nav>
          </Col>

          {/* Contact Section */}
          <Col xs={24} md={12} lg={6}>
            <Title
              level={3}
              style={{ fontFamily: "serif", marginBottom: "16px" }}
            >
              Contact Us
            </Title>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {contactInfo.map((info) => (
                <div key={info.key} className="flex items-center gap-2">
                  {info.icon}
                  <Text>
                    {info.value}
                  </Text>
                </div>
              ))}
            </Space>

            {/* Google Map */}
            <div style={{ marginTop: "16px", height: "150px", borderRadius: "6px", overflow: "hidden" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3832.823943428348!2d108.1984495186215!3d16.06874469036182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218525363e4db%3A0xc3edfd32e4e754cf!2zMjAgVGh14bqtbiBBbiA0LCBDaMOtbmggR2nDoW4sIFRoYW5oIEtow6osIMSQw6AgTuG6tW5nIDU1MDAwMCwgVmlldG5hbQ!5e0!3m2!1sen!2sus!4v1753640604479!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Store Location"
              />
            </div>
          </Col>
        </Row>

        <Divider style={{ borderColor: isDarkMode ? "#3f3f46" : "#92400e", opacity: 0.3, margin: "48px 0 24px 0" }} />

        <div style={{ textAlign: "center" }}>
          <Text style={{ opacity: 0.7, fontSize: "14px" }}>
            © {new Date().getFullYear()} Retro Threads. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  )
}