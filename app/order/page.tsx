import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getOrders } from './get-orders';
import OrderTabs from './OrderTabs';

export default async function OrderPage() {
  const orders = await getOrders();

  if (!orders || orders.length === 0) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6">No orders found.</Typography>
      </Box>
    );
  }

  // Filter orders by status
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const waitingForDeliveryOrders = orders.filter(order => order.status === 'Waiting for delivery');
  const shippingOrders = orders.filter(order => order.status === 'shipping');
  const deliveredOrders = orders.filter(order => order.status === 'delivered');
  const cancelledOrders = orders.filter(order => order.status === 'cancelled');

  return (
    <Box sx={{ mt: 4, width: '100%', typography: 'body1' }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      <OrderTabs
        pendingOrders={pendingOrders}
        waitingForDeliveryOrders={waitingForDeliveryOrders}
        shippingOrders={shippingOrders}
        deliveredOrders={deliveredOrders}
        cancelledOrders={cancelledOrders}
      />
    </Box>
  );
}
