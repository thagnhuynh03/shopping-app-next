'use client';
import { Dropdown, Button, Checkbox } from 'antd';
import { DownOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { FaArrowsDownToLine } from "react-icons/fa6";
import { useState } from 'react';

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const categoryOptions = ['Áo', 'Quần', 'Đầm', 'Phụ kiện'];
const colorOptions = ['Đen', 'Trắng', 'Be', 'Xanh', 'Hồng'];
const priceOptions = ['< 200K', '200K - 500K', '500K - 1M', '> 1M'];
const sortOptions = ['Tiêu biểu', 'Hàng mới về', 'Từ thấp đến cao', 'Từ cao đến thấp', 'Xếp hạng cao nhất'];

export default function ProductFilter() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [selected, setSelected] = useState({
        size: [] as string[],
        category: [] as string[],
        color: [] as string[],
        price: [] as string[],
    });
    const [selectedSort, setSelectedSort] = useState<string>('Tiêu biểu');

    const dropdownConfig = [
        { key: 'size', label: 'Sizes', options: sizeOptions },
        { key: 'category', label: 'Categories', options: categoryOptions },
        { key: 'color', label: 'Colors', options: colorOptions },
        { key: 'price', label: 'Price', options: priceOptions },
    ];

    const handleChange = (key: keyof typeof selected, values: string[]) => {
        setSelected(prev => ({ ...prev, [key]: values }));
    };

    const renderMenu = (key: keyof typeof selected, options: string[]) => (
        <div className="p-5 bg-[#fdfaf6] w-auto rounded-2xl shadow-lg text-[#1a120f] font-serif">
        <div className="flex justify-end mb-2">
            <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setOpenDropdown(null)}
            className="text-[#4f453c] hover:text-black"
            />
        </div>
        <div className="mb-2 font-semibold text-base capitalize">{key}</div>
        <div className="text-sm">
            <Checkbox.Group
            value={selected[key]}
            onChange={values => handleChange(key, values as string[])}
            className="!grid grid-cols-2 justify-between"
            >
            {options.map(opt => (
                <Checkbox key={opt} value={opt}>
                {opt}
                </Checkbox>
            ))}
            </Checkbox.Group>
        </div>
        </div>
    );

    const renderLabel = (key: keyof typeof selected, label: string) => {
        const values = selected[key];
        return values.length > 0 ? `${label}: ${values.join(', ')}` : label;
    };

  const sortItems = sortOptions.map(option => ({
    key: option,
    label: (
      <div className="flex justify-between items-center">
        {option}
        {selectedSort === option && <CheckOutlined />}
      </div>
    ),
    className: 'hover:bg-[#f0ebe3] py-2 px-3 font-medium',
  }));
  
  const handleSortClick = ({ key }: { key: string }) => {
    setSelectedSort(key);
    setOpenDropdown(null);
  };

  return (
    <div className="flex justify-between mt-5 flex-wrap">
    <div className='space-x-3'>
        {dropdownConfig.map(({ key, label, options }) => (
        <Dropdown
            key={key}
            open={openDropdown === key}
            onOpenChange={isOpen => setOpenDropdown(isOpen ? key : null)}
            popupRender={() => renderMenu(key as keyof typeof selected, options)}
            trigger={['click']}
        >
            <Button className="!bg-[#f3ede7] dark:!bg-[#473624] dark:!text-[#ffffff] !border-none !rounded-2xl px-4 py-1 !font-medium hover:!border-[#a0895e] hover:!text-[#a0895e]">
            {renderLabel(key as keyof typeof selected, label)} <DownOutlined />
            </Button>
        </Dropdown>
        ))}
    </div>
    <div>
        <Dropdown menu={{ items: sortItems, onClick: handleSortClick }} trigger={['click']}>
        <Button className="!border-none !bg-transparent dark:!text-[#ffffff] px-4 py-1 !text-lg !font-semibold hover:!border-[#a0895e] hover:!text-[#a0895e]">
            <FaArrowsDownToLine /> Sắp xếp theo
        </Button>
        </Dropdown>
    </div>
  </div>

  );
}