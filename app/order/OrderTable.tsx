"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getProductImage } from '../products/product-image';
import { Order } from './interfaces/order.interface';
import Image from "next/image";
import Button from '@mui/material/Button';
import { cancelOrder } from './action/cancel-order';

type Province = { code: number; name: string; };
type District = { code: number; name: string; districts?: District[]; };
type Ward = { code: number; name: string; wards?: Ward[]; };

// Helper function to get location text from API
const getLocationText = async (city: number, district: number, ward: number) => {
  try {
    // Get provinces data
    const provincesResponse = await fetch('https://provinces.open-api.vn/api');
    const provinces: Province[] = await provincesResponse.json();
    
    // Find the province/city
    const province = provinces.find((p) => p.code === city);
    if (!province) {
      return {
        city: `City ${city}`,
        district: `District ${district}`,
        ward: `Ward ${ward}`
      };
    }

    // Get districts for the province
    const districtsResponse = await fetch(`https://provinces.open-api.vn/api/p/${city}?depth=2`);
    const provinceWithDistricts: { districts: District[] } = await districtsResponse.json();
    
    // Find the district
    const districtData = provinceWithDistricts.districts?.find((d) => d.code === district);
    if (!districtData) {
      return {
        city: province.name,
        district: `District ${district}`,
        ward: `Ward ${ward}`
      };
    }

    // Get wards for the district
    const wardsResponse = await fetch(`https://provinces.open-api.vn/api/d/${district}?depth=2`);
    const districtWithWards: { wards: Ward[] } = await wardsResponse.json();
    
    // Find the ward
    const wardData = districtWithWards.wards?.find((w) => w.code === ward);
    
    return {
      city: province.name,
      district: districtData.name,
      ward: wardData ? wardData.name : `Ward ${ward}`
    };
  } catch (error) {
    console.error('Error fetching location data:', error);
    return {
      city: `City ${city}`,
      district: `District ${district}`,
      ward: `Ward ${ward}`
    };
  }
};

interface OrderTableProps {
  orders: Order[];
}

function OrderRow({ order }: { order: Order }) {
  const [open, setOpen] = React.useState(false);
  const [locationText, setLocationText] = React.useState<{
    city: string;
    district: string;
    ward: string;
  }>({
    city: `City ${order.address.city}`,
    district: `District ${order.address.district}`,
    ward: `Ward ${order.address.ward}`
  });

  React.useEffect(() => {
    const fetchLocationData = async () => {
      const location = await getLocationText(order.address.city, order.address.district, order.address.ward);
      setLocationText(location);
    };
    
    fetchLocationData();
  }, [order.address.city, order.address.district, order.address.ward]);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          #{order.id}
        </TableCell>
        <TableCell align="right">${order.total.toLocaleString()}</TableCell>
        <TableCell align="right">{order.status}</TableCell>
        <TableCell align="right">
          {new Date(order.createdAt).toISOString().split('T')[0].split('-').reverse().join('/')}
        </TableCell>
        <TableCell align="right">{order.paymentMethod.name}</TableCell>
        <TableCell align="right">
          {order.status === "pending" && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={async () => {
                await cancelOrder(order.id);
              }}
            >
              Cancel Order
            </Button>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Shipping Address:</Typography>
                <Typography variant="body2">
                  {order.address.name} - {order.address.phoneNumber}
                </Typography>
                <Typography variant="body2">{order.address.address}</Typography>
                <Typography variant="body2">
                  {locationText.ward}, {locationText.district}, {locationText.city}
                </Typography>
              </Box>
              <Table size="small" aria-label="order items">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row">
                        <Box display="flex" alignItems="center">
                          <Image
                            src={getProductImage(item.productSize.color.product.id)}
                            alt={item.productSize.color.product.name}
                            width={40}
                            height={40}
                            style={{ marginRight: 8, objectFit: 'cover', borderRadius: 4 }}
                          />
                          <Typography variant="body2">
                            {item.productSize.color.product.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{item.productSize.size.name}</TableCell>
                      <TableCell>{item.productSize.color.color.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">${item.price.toLocaleString()}</TableCell>
                      <TableCell align="right">${(item.quantity * item.price).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function OrderTable({ orders }: OrderTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="orders table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order ID</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Payment Method</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 