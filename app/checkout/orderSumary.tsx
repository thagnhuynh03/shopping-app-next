'use client';
import { Card, Typography, Space, Button, Input, Divider, Image, Row, Col, Tag } from 'antd';
import { GiftOutlined } from '@ant-design/icons';
import { CartItem } from '../cart/interface/cart.interface';
import { getProductImage } from '../products/product-image';

const { Title, Text } = Typography;

interface OrderSummaryProps {
  cart: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  voucher: string;
  voucherError: string;
  onVoucherChange: (voucher: string) => void;
  onApplyVoucher: () => void;
}

export default function OrderSummary({
  cart,
  subtotal,
  shipping,
  discount,
  total,
  voucher,
  voucherError,
  onVoucherChange,
  onApplyVoucher,
}: OrderSummaryProps) {
  return (
    <Card title={<Title level={4}>Order Summary ({cart.length} items)</Title>} className="mb-4">
      <Space direction="vertical" size="middle" className="w-full">
        {/* Cart Items */}
        <div className="max-h-64 overflow-y-auto">
          {cart.map((item: CartItem) => (
            <div key={item.id} className="flex items-center space-x-3 py-2">
              <Image
                src={getProductImage(item.product?.color?.product?.id ?? 0)}
                alt={item.product?.color?.product?.name ?? "Product"}
                width={48}
                height={48}
                className="rounded object-cover"
                preview={false}
              />
              <div className="flex-1 min-w-0">
                <Text className="font-medium block truncate">
                  {item.product?.color?.product?.name}
                </Text>
                <div className="flex space-x-2 mt-1">
                  <Tag>Size: {item.product?.size?.name}</Tag>
                  <Tag>Color: {item.product?.color?.color?.name}</Tag>
                </div>
              </div>
              <div className="text-right">
                <Text className="font-medium">
                  ${item.price.toLocaleString()}
                </Text>
                {item.quantity > 1 && (
                  <Text type="secondary" className="block text-sm">
                    x{item.quantity}
                  </Text>
                )}
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* Voucher Section */}
        <div>
          <Text className="block mb-2 font-medium">
            <GiftOutlined className="mr-2" />
            Discount Code
          </Text>
          <Row gutter={8}>
            <Col flex="auto">
              <Input
                placeholder="Enter discount code"
                value={voucher}
                onChange={(e) => onVoucherChange(e.target.value)}
                status={voucherError ? 'error' : ''}
              />
            </Col>
            <Col>
              <Button 
                type="primary" 
                onClick={onApplyVoucher}
              >
                Apply
              </Button>
            </Col>
          </Row>
          {voucherError && (
            <Text type="danger" className="text-sm mt-1 block">
              {voucherError}
            </Text>
          )}
        </div>

        <Divider />

        {/* Price Breakdown */}
        <Space direction="vertical" size="small" className="w-full">
          <div className="flex justify-between">
            <Text>Subtotal</Text>
            <Text>${subtotal.toLocaleString()}</Text>
          </div>
          <div className="flex justify-between">
            <Text>Shipping Fee</Text>
            <Text>${shipping.toLocaleString()}</Text>
          </div>
          {discount > 0 && (
            <div className="flex justify-between">
              <Text type="success">Discount</Text>
              <Text type="success">-${discount.toLocaleString()}</Text>
            </div>
          )}
          <Divider className="my-2" />
          <div className="flex justify-between">
            <Title level={5} className="mb-0">Total</Title>
            <Title level={5} className="mb-0 text-primary">
              ${total.toLocaleString()}
            </Title>
          </div>
        </Space>
      </Space>
    </Card>
  );
}
