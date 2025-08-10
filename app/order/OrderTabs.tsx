"use client";

import * as React from 'react';
import { Order } from './interfaces/order.interface';
import OrderCard from './OrderCard';
import { Col, Empty, Row, Tabs, Typography } from 'antd';
import { ThemeContext } from '../theme-context';

const { Title } = Typography

interface OrderTabsProps {
  pendingOrders: Order[];
  processingOrders: Order[];
  shippingOrders: Order[];
  deliveredOrders: Order[];
  cancelledOrders: Order[];
}

export default function OrderTabs({ 
  pendingOrders, 
  processingOrders, 
  shippingOrders, 
  deliveredOrders, 
  cancelledOrders 
}: OrderTabsProps) {
  const { isDarkMode } = React.useContext(ThemeContext)

  // const allOrders = [
  //   ...pendingOrders,
  //   ...processingOrders,
  //   ...shippingOrders,
  //   ...deliveredOrders,
  //   ...cancelledOrders
  // ];

  const renderOrderGrid = (orders: Order[]) => {
    if (orders.length === 0) {
      return (
        <div className="py-12">
          <Empty description="No orders found" className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
        </div>
      )
    }

    return (
      <Row gutter={[24, 24]}>
        {orders.map((order) => (
          <Col key={order.id} xs={24} lg={12} xl={12}>
            <OrderCard order={order} />
          </Col>
        ))}
      </Row>
    )
  }

  const tabItems = [
    {
      key: "processing",
      label: `On Process ${(pendingOrders.length > 0 || processingOrders.length > 0) ? `(${pendingOrders.length + processingOrders.length})` : "" }`,
      children: renderOrderGrid(pendingOrders),
    },
    {
      key: "shipping",
      label: `On Shipping ${shippingOrders.length > 0 ? `(${shippingOrders.length})` : "" }`,
      children: renderOrderGrid(shippingOrders),
    },
    {
      key: "arrived",
      label: `Arrived ${deliveredOrders.length > 0 ? `(${deliveredOrders.length})` : "" }`,
      children: renderOrderGrid(deliveredOrders),
    },
    {
      key: "canceled",
      label: `Canceled ${cancelledOrders.length > 0 ? `(${cancelledOrders.length})` : "" }`,
      children: renderOrderGrid(cancelledOrders),
    },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <Title level={2} className="!mb-6">
        My Orders
      </Title>

      <Tabs defaultActiveKey="process" items={tabItems} className={` ${isDarkMode ? "order-tabs-dark" : "order-tabs"}`} size="large" style={{ fontWeight: "bold"}}/>

      
    </div>
  );
} 