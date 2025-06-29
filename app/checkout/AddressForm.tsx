'use client';
import React, { useEffect, useState } from 'react';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Typography,
  TextField,
} from '@mui/material';
import { Address } from './interfaces/address.interface';

type Province = { code: string | number; name: string };
type District = { code: string | number; name: string };
type Ward = { code: string | number; name: string };

export default function AddressForm({ addresses, onChange } : { addresses: Address[], onChange: (data: { selectedAddressId: string, formData: Address }) => void }) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  // New states for addresses and form data
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

  useEffect(() => {
    // Fetch all provinces
    fetch('https://provinces.open-api.vn/api/p/')
      .then(res => res.json())
      .then(data => setProvinces(data));

    // Fetch all districts
    fetch('https://provinces.open-api.vn/api/d/')
      .then(res => res.json())
      .then(data => setAllDistricts(data));

    // Fetch all wards
    fetch('https://provinces.open-api.vn/api/w/')
      .then(res => res.json())
      .then(data => setAllWards(data));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then(res => res.json())
        .then(data => setDistricts(data.districts || []));
    } else {
      setDistricts([]);
      setWards([]);
      setSelectedDistrict('');
      setSelectedWard('');
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then(res => res.json())
        .then(data => setWards(data.wards || []));
    } else {
      setWards([]);
      setSelectedWard('');
    }
  }, [selectedDistrict]);

  // When an address is selected, fill the form fields
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

  return (
    <>
      <Typography variant="h6" mb={2}>Thông tin nhận hàng</Typography>
      <FormControl fullWidth margin="normal" sx={{ maxWidth: 400 }}>
        <InputLabel id="address-select-label">Chọn địa chỉ đã lưu</InputLabel>
        <Select
          labelId="address-select-label"
          value={selectedAddressId}
          label="Chọn địa chỉ đã lưu"
          onChange={(e: SelectChangeEvent) => setSelectedAddressId(e.target.value)}
          sx={{
            width: '100%',
            maxWidth: 400,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          <MenuItem value="">
            <em>Nhập địa chỉ mới</em>
          </MenuItem>
          {addresses.map(addr => (
            <MenuItem
              key={addr.id}
              value={addr.id}
            >
              {addr.name} - {addr.address}, 
              {allWards.find(w => w.code === addr.ward)?.name || addr.ward},
              {allDistricts.find(d => d.code === addr.district)?.name || addr.district},
              {provinces.find(p => p.code === addr.city)?.name || addr.city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <TextField
        fullWidth
        label="Họ và tên"
        name="name"
        margin="normal"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <TextField
        fullWidth
        label="Số điện thoại"
        name="phoneNumber"
        margin="normal"
        value={formData.phoneNumber}
        onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
      />
      <Typography variant="h6" gutterBottom>
        Chọn địa chỉ
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="province-label">Tỉnh/Thành phố</InputLabel>
        <Select
          labelId="province-label"
          value={selectedProvince}
          label="Tỉnh/Thành phố"
          onChange={(e: SelectChangeEvent) => {
            setSelectedProvince(e.target.value);
            setFormData({ ...formData, city: e.target.value, district: '', ward: '' });
          }}
        >
          {provinces.map(p => (
            <MenuItem key={p.code} value={p.code}>
              {p.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" disabled={!districts.length}>
        <InputLabel id="district-label">Quận/Huyện</InputLabel>
        <Select
          labelId="district-label"
          value={selectedDistrict}
          label="Quận/Huyện"
          onChange={(e: SelectChangeEvent) => {
            setSelectedDistrict(e.target.value);
            setFormData({ ...formData, district: e.target.value, ward: '' });
          }}
        >
          {districts.map(d => (
            <MenuItem key={d.code} value={d.code}>
              {d.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" disabled={!wards.length}>
        <InputLabel id="ward-label">Phường/Xã</InputLabel>
        <Select
          labelId="ward-label"
          value={selectedWard}
          label="Phường/Xã"
          onChange={(e: SelectChangeEvent) => {
            setSelectedWard(e.target.value);
            setFormData({ ...formData, ward: e.target.value });
          }}
        >
          {wards.map(w => (
            <MenuItem key={w.code} value={w.code}>
              {w.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Địa chỉ"
        name="address"
        margin="normal"
        value={formData.address}
        onChange={e => setFormData({ ...formData, address: e.target.value })}
      />
      </>
  );
}
