"use client";
import Link from "next/link";
import { useActionState, useContext, useState } from "react";
import login from "../login/login";
import type { FormResponse } from "@/app/common/form-response.interface";
import Loader from "@/app/components/loader";
import { ThemeContext } from "@/app/theme-context";
import { Button, Col, Input, message, Row, Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function LoginForm() {
  const { isDarkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const [messageApi, contextHolder] = message.useMessage();
  const [state, formData] = useActionState(
    async (prevState: FormResponse, formData: FormData) => {
      setLoading(true);
      const result = await login(prevState, formData);
      setLoading(false);
      if (result.error) {
        messageApi.error({
          content: result.error,
          duration: 3,
          style: {
            position: 'fixed',
            top: 20,
            left: 20,
          },
        });
      } else if (!result.error) {
        messageApi.success({
          content: 'Log in successfully!',
          duration: 2,
          style: {
            position: 'fixed',
            top: 20,
            left: 20,
          },
        })
        setTimeout(() => {
          router.push('/')
        }, 2000)
    }
      return result;
    },
    { error: "" }
  );
  const textColor = isDarkMode ? "#e4e4e7" : "#000000"
  const subtextColor = isDarkMode ? "#a1a1aa" : "#6b7280"
  const inputBorderColor = isDarkMode ? "#3f3f46" : "#e5e7eb"
  const inputBgColor = isDarkMode ? "#27272a" : "#ffffff"

  return (
    <div className={`min-h-screen w-full ${isDarkMode ? "bg-zinc-900" : "bg-gray-50"}`}>
      {loading && <Loader />}
      <Row className="min-h-screen">
        {/* Left Column - Form */}
        <Col xs={24} lg={12} className="flex flex-col justify-center items-center">
          {contextHolder}
          <div className="h-full flex-1 flex flex-col justify-center items-center px-8 sm:px-12 lg:px-16 xl:px-20">
            <div className="max-w-sm w-full">
              <div className="mb-8">
                <Title
                  level={1}
                  className="mb-3"
                  style={{
                    color: textColor,
                    fontSize: "32px",
                    fontWeight: "600",
                    lineHeight: "1.2",
                    margin: 0,
                  }}
                >
                  Welcome back
                </Title>
                <Text style={{ color: subtextColor, fontSize: "16px" }}>
                  Sign in to continue your vintage fashion journey
                </Text>
              </div>

              {/* Google Sign Up Button */}
              <Button
                size="large"
                className="w-full h-12 mb-6 flex items-center justify-center font-medium border-gray-300"
                icon={<GoogleOutlined style={{ fontSize: "18px", marginRight: "8px" }} />}
                style={{
                  backgroundColor: isDarkMode ? "#27272a" : "#ffffff",
                  borderColor: isDarkMode ? "#3f3f46" : "#d1d5db",
                  color: textColor,
                }}
              >
                Login with Google
              </Button>
                
              {/* Divider */}
              <div className="flex items-center mb-6">
                <div className={`flex-1 h-px ${isDarkMode ? "bg-zinc-700" : "bg-gray-200"}`} />
                <Text className="px-4" style={{ color: subtextColor, fontSize: "14px" }}>
                  or
                </Text>
                <div className={`flex-1 h-px ${isDarkMode ? "bg-zinc-700" : "bg-gray-200"}`} />
              </div>

              {/* HTML Form + Antd Input */}
              <form action={formData} onSubmit={() => setLoading(true)}>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium" style={{ color: textColor }}>
                    Email <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="h-12 rounded-md"
                    style={{
                      backgroundColor: inputBgColor,
                      borderColor: inputBorderColor,
                      color: textColor,
                    }}
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-1 text-sm font-medium" style={{ color: textColor }}>
                    Password <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <Input.Password
                    name="password"
                    placeholder="Enter your password"
                    required
                    minLength={8}
                    className="h-12 rounded-md"
                    style={{
                      backgroundColor: inputBgColor,
                      borderColor: inputBorderColor,
                      color: textColor,
                    }}
                  />
                </div>

                <Button
                  htmlType="submit"
                  type="primary"
                  block
                  loading={loading}
                  size="large"
                  className="h-12 font-semibold text-base rounded-md mb-6"
                >
                  Log in
                </Button>
              </form>
              {state.error && <div className="hidden">{state.error}</div>}
              <div className="text-center">
                <Text style={{ color: subtextColor, fontSize: "14px" }}>
                  Already have an account?{" "}
                  <Link href="/auth/signup">
                    <Text className="font-medium cursor-pointer underline" style={{ color: textColor }}>
                     Sign up
                    </Text>
                  </Link>
                </Text>
              </div>
            </div>
          </div>
        </Col>
        
        {/* Right Column - Image */}
        <Col xs={0} lg={12} className="relative">
          <div className="relative h-full min-h-screen">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop"
              alt="Vintage fashion model"
              fill
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
              <div className="max-w-md">
                <Title
                  level={1}
                  className="mb-8"
                  style={{
                    color: "#ffffff",
                    fontSize: "36px",
                    fontWeight: "600",
                    lineHeight: "1.2",
                    margin: 0,
                  }}
                >
                  Welcome Back to Your Vintage Collection
                </Title>
                <Text className="!text-white text-lg mb-8 block leading-relaxed">
                  Continue exploring our carefully curated vintage fashion pieces and discover timeless styles that
                  define your unique aesthetic.
                </Text>

                {/* Feature Badges */}
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <Text className="!text-white text-sm font-medium">Secure Login</Text>
                  </div>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <Text className="!text-white text-sm font-medium">Personal Collection</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}