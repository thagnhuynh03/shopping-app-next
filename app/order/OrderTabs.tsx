"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import OrderTable from './OrderTable';
import { Order } from './interfaces/order.interface';

interface OrderTabsProps {
  pendingOrders: Order[];
  waitingForDeliveryOrders: Order[];
  shippingOrders: Order[];
  deliveredOrders: Order[];
  cancelledOrders: Order[];
}

export default function OrderTabs({ 
  pendingOrders, 
  waitingForDeliveryOrders, 
  shippingOrders, 
  deliveredOrders, 
  cancelledOrders 
}: OrderTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const allOrders = [
    ...pendingOrders,
    ...waitingForDeliveryOrders,
    ...shippingOrders,
    ...deliveredOrders,
    ...cancelledOrders
  ];

  const tabLabels = [
    `All (${allOrders.length})`,
    `Pending (${pendingOrders.length})`,
    `Waiting for Delivery (${waitingForDeliveryOrders.length})`,
    `Shipping (${shippingOrders.length})`,
    `Delivered (${deliveredOrders.length})`,
    `Cancelled (${cancelledOrders.length})`
  ];

  const tabPanels = [
    allOrders,
    pendingOrders,
    waitingForDeliveryOrders,
    shippingOrders,
    deliveredOrders,
    cancelledOrders
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="order status tabs" variant="scrollable" scrollButtons="auto">
          {tabLabels.map((label, index) => (
            <Tab key={index} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ mt: 2 }}>
        <OrderTable orders={tabPanels[value]} />
      </Box>
    </Box>
  );
} 