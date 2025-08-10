"use client";

import { Card, Divider, Radio, Typography } from "antd";

const paymentMethods = [
  { id: 1, name: "Online" },
  { id: 2, name: "COD" }
];

const { Title, Text } = Typography

export default function PaymentSelector({ value, onChange }: { value: number, onChange: (val: number) => void }) {
  return (
    <Card className="mb-4 h-full" style={{ backgroundColor: "transparent", border: "none" }}>
      <Title level={3}>Payment Methods</Title>
      <Radio.Group
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full border-1 border-[#424252] rounded-md !flex flex-col content-center"
      >
        {paymentMethods.map((method, index) => (
          <div key={method.id}>
            <Radio value={method.id} className="w-full !px-5 !py-5">
              <div className="flex items-center space-x-3">
                <Text className="text-lg font-medium">{method.name}</Text>
              </div>
            </Radio>
            {index < paymentMethods.length - 1 && <Divider className="w-full !my-0" />}
          </div>
        ))}
      </Radio.Group>
    </Card>
  );
}