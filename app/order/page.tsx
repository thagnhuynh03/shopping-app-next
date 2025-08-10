import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getOrders } from './action/get-orders';
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
  const processingOrders = orders.filter(order => order.status === 'processing');
  const shippingOrders = orders.filter(order => order.status === 'shipping');
  const deliveredOrders = orders.filter(order => order.status === 'delivered');
  const cancelledOrders = orders.filter(order => order.status === 'cancelled');

  return (
    <div className="min-h-screen">
      <OrderTabs
        pendingOrders={pendingOrders}
        processingOrders={processingOrders}
        shippingOrders={shippingOrders}
        deliveredOrders={deliveredOrders}
        cancelledOrders={cancelledOrders}
      />
    </div>
  );
}
