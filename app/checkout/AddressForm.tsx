'use client';
import React, { useEffect, useState } from 'react';
import {
  Input,
  Select,
  Typography,
  Space,
  Card,
} from 'antd';
import { Address } from './interfaces/address.interface';

const { Title, Text } = Typography;
const { Option } = Select;

type Province = { code: string | number; name: string };
type District = { code: string | number; name: string };
type Ward = { code: string | number; name: string };

interface AddressFormProps {
  addresses: Address[];
  onChange: (data: { selectedAddressId: string; formData: Address }) => void;
}

export default function AddressFormAntd({ addresses, onChange }: AddressFormProps) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    city: '',
    district: '',
    ward: '',
  });

  const [allDistricts, setAllDistricts] = useState<District[]>([]);
  const [allWards, setAllWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState({
    provinces: false,
    districts: false,
    wards: false,
  });

  useEffect(() => {
    setLoading(prev => ({ ...prev, provinces: true }));

    Promise.all([
      fetch('https://provinces.open-api.vn/api/p/').then(res => res.json()),
      fetch('https://provinces.open-api.vn/api/d/').then(res => res.json()),
      fetch('https://provinces.open-api.vn/api/w/').then(res => res.json()),
    ]).then(([provincesData, districtsData, wardsData]) => {
      setProvinces(provincesData);
      setAllDistricts(districtsData);
      setAllWards(wardsData);
      setLoading(prev => ({ ...prev, provinces: false }));
    }).catch(() => {
      setLoading(prev => ({ ...prev, provinces: false }));
    });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      setLoading(prev => ({ ...prev, districts: true }));
      fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then(res => res.json())
        .then(data => {
          setDistricts(data.districts || []);
          setLoading(prev => ({ ...prev, districts: false }));
        })
        .catch(() => {
          setLoading(prev => ({ ...prev, districts: false }));
        });
    } else {
      setDistricts([]);
      setWards([]);
      setSelectedDistrict('');
      setSelectedWard('');
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      setLoading(prev => ({ ...prev, wards: true }));
      fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then(res => res.json())
        .then(data => {
          setWards(data.wards || []);
          setLoading(prev => ({ ...prev, wards: false }));
        })
        .catch(() => {
          setLoading(prev => ({ ...prev, wards: false }));
        });
    } else {
      setWards([]);
      setSelectedWard('');
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedAddressId) {
      const address = addresses.find(a => a.id === Number(selectedAddressId));
      if (address) {
        setFormData({
          name: address.name || '',
          phoneNumber: address.phoneNumber || '',
          address: address.address || '',
          city: address.city?.toString() || '',
          district: address.district?.toString() || '',
          ward: address.ward?.toString() || '',
        });
        setSelectedProvince(address.city?.toString() || '');
        setSelectedDistrict(address.district?.toString() || '');
        setSelectedWard(address.ward?.toString() || '');
      }
    } else {
      setFormData({
        name: '',
        phoneNumber: '',
        address: '',
        city: '',
        district: '',
        ward: '',
      });
      setSelectedProvince('');
      setSelectedDistrict('');
      setSelectedWard('');
    }
  }, [selectedAddressId, addresses]);

  useEffect(() => {
    if (onChange) {
      onChange({ selectedAddressId, formData });
    }
  }, [selectedAddressId, formData, onChange]);
  console.log(typeof selectedProvince)
  return (
    <Card className="mb-4 h-full" style={{ backgroundColor: "transparent", border: "none" }}>
      <Space direction="vertical" size="large" className="w-full">
        <Title level={3}>Shipping Information</Title>
        <Space direction="vertical" size="small" className='w-full'>
          <Text className='font-medium text-lg'>Saved address:</Text>
          <Select
            placeholder="Select a saved address or enter new one"
            value={selectedAddressId || undefined}
            onChange={setSelectedAddressId}
            allowClear
            size='large'
            className='w-full'

          >
            <Option value="">Nhập địa chỉ mới</Option>
            {addresses.map(addr => (
              <Option key={addr.id} value={addr.id}>
                {addr.name} - {addr.address}, {' '}
                {allWards.find(w => w.code === addr.ward)?.name || addr.ward}, {' '}
                {allDistricts.find(d => d.code === addr.district)?.name || addr.district}, {' '}
                {provinces.find(p => p.code === addr.city)?.name || addr.city}
              </Option>
            ))}
          </Select>
        </Space>
        <Title level={4}>New Address(Optional)</Title>
        <Space direction='vertical' className='w-full' size="middle">
          <Space direction='vertical' size='small' className='w-full'>
            <Text className='text-lg font-medium'>Full name:</Text>
            <Input placeholder="Enter full name" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              size='large' className='w-full' />
          </Space>
          <Space direction='vertical' size='small' className='w-full'>
            <Text className='text-lg font-medium'>Phone number:</Text>
            <Input placeholder="Enter phone number" value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              size='large' className='w-full' />
          </Space>
          <Space className='w-full' size="middle">
            <Space direction='vertical' size='small'>
              <Text className='text-lg font-medium'>Province/City:</Text>
              <Select
                placeholder="Select province/city"
                size="large"
                allowClear
                loading={loading.provinces}
                value={selectedProvince || undefined}
                onChange={(value) => {
                  setSelectedProvince(value);
                  setFormData({ ...formData, city: value, district: '', ward: '' });
                }}
              >
                {provinces.map(p => (
                  <Option key={p.code} value={p.code.toString()}>
                    {p.name}
                  </Option>
                ))}
              </Select>
            </Space>
            <Space direction='vertical' size="small">
              <Text className='text-lg font-medium'>District:</Text>
              <Select
                placeholder="Select district"
                size='large'
                allowClear
                loading={loading.districts}
                disabled={!districts.length}
                value={selectedDistrict || undefined}
                onChange={(value) => {
                  setSelectedDistrict(value);
                  setFormData({ ...formData, district: value, ward: '' });
                }}
              >
                {districts.map(d => (
                  <Option key={d.code} value={d.code.toString()}>
                    {d.name}
                  </Option>
                ))}
              </Select>
            </Space>
            <Space direction='vertical' size='small'>
              <Text className='text-lg font-medium'>Ward:</Text>
              <Select
                placeholder="Select ward"
                allowClear
                loading={loading.wards}
                disabled={!wards.length}
                value={selectedWard || undefined}
                onChange={(value) => {
                  setSelectedWard(value);
                  setFormData({ ...formData, ward: value });
                }}
              >
                {wards.map(w => (
                  <Option key={w.code} value={w.code.toString()}>
                    {w.name}
                  </Option>
                ))}
              </Select>
            </Space>
          </Space>
          <Space direction='vertical' size='small' className='w-full'>
            <Text className='text-lg font-medium'>Detailed address:</Text>
            <Input.TextArea
              placeholder="Enter detailed address (street, house number, etc.)"
              rows={3}
              size='large'
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
            />
          </Space>
        </Space>
      </Space>
    </Card>
  );
}
