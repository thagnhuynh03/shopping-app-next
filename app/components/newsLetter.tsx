"use client"

import { useContext, useState } from "react"
import { Form, Input, Button, Checkbox, Typography, Row, Col, message } from "antd"
import { MailOutlined } from "@ant-design/icons"
import { ThemeContext } from "../theme-context"
import Image from "next/image"

const { Title, Text } = Typography

export function Newsletter() {
  const { isDarkMode } = useContext(ThemeContext)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFinish = async () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      message.success({
        content: "Welcome to the RetroThreads community! Check your email for a special welcome offer.",
        duration: 4,
      })
      form.resetFields()
      setLoading(false)
    }, 1500)
  }

  const sectionBgColor = isDarkMode ? "#27272a" : "#f4f4f5"
  const textColor = isDarkMode ? "#ffffff" : "#18181b"
  const subtextColor = isDarkMode ? "#a1a1aa" : "#52525b"
  const inputBgColor = isDarkMode ? "#18181b" : "#ffffff"
  const inputBorderColor = isDarkMode ? "#3f3f46" : "#d4d4d8"

  return (
    <section className="mb-16 sm:mx-12">
      <div className="rounded-2xl overflow-hidden shadow-lg " style={{ backgroundColor: sectionBgColor }}>
        <Row className="min-h-[400px]">
          {/* Left Column - Content */}
          <Col xs={24} md={12} className="flex items-center">
            <div className="p-8 md:p-12 w-full">
              {/* Header with Badge */}
              <div className="mb-6">
                <Title
                  level={2}
                  className="mb-4"
                  style={{
                    color: textColor,
                    fontSize: "clamp(24px, 4vw, 32px)",
                    fontWeight: "700",
                    lineHeight: "1.2",
                    margin: 0,
                    marginBottom: "16px",
                  }}
                >
                  Join Our Vintage Community
                </Title>
              </div>

              <Text
                className="block mb-6"
                style={{
                  color: subtextColor,
                  fontSize: "16px",
                  lineHeight: "1.6",
                }}
              >
                Subscribe to our newsletter and be the first to know about new arrivals, exclusive vintage finds, and
                special promotions.
              </Text>

              <Form form={form} name="newsletter-enhanced" onFinish={onFinish} layout="vertical" className="space-y-4">
                {/* Email Input Row */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                    className="flex-1 mb-0"
                  >
                    <Input
                      size="large"
                      prefix={<MailOutlined style={{ color: subtextColor, marginRight: 5 }} />}
                      placeholder="Enter your email address"
                      className="h-12 rounded-lg"
                      style={{
                        backgroundColor: inputBgColor,
                        borderColor: inputBorderColor,
                        color: textColor,
                      }}
                    />
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    size="large"
                    className="!h-12 px-8 py-[6px] font-semibold flex-shrink-0 rounded-lg"
                  >
                    {loading ? "Subscribing..." : "Get 15% Off"}
                  </Button>
                </div>

                {/* Terms Checkbox */}
                <Form.Item
                  name="terms"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(new Error("Please agree to receive marketing emails")),
                    },
                  ]}
                  className="mb-0"
                >
                  <div className="flex items-start">
                    <Checkbox
                      style={{
                        color: textColor,
                      }}
                    >
                      <div className="ml-2">
                        <Text
                          className="block font-medium"
                          style={{
                            color: isDarkMode ? "#d4d4d8" : "#374151",
                            fontSize: "14px",
                          }}
                        >
                          I agree to receive marketing emails and special offers
                        </Text>
                        <Text
                          className="block"
                          style={{
                            color: subtextColor,
                            fontSize: "13px",
                            marginTop: "2px",
                          }}
                        >
                          We respect your privacy. Unsubscribe at any time. No spam, promise!
                        </Text>
                      </div>
                    </Checkbox>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Col>

          {/* Right Column - Image */}
          <Col xs={24} md={12} className="relative">
            <div className="relative h-64 md:h-full min-h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                alt="Vintage fashion newsletter - Join our community"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />

              {/* Gradient overlay for better visual appeal */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-black/30" />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}
