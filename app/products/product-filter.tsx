'use client';
import { Dropdown, Button, Checkbox } from 'antd';
import { DownOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { FaArrowsDownToLine } from "react-icons/fa6";
import { useContext, useState } from 'react';
import { ThemeContext } from '../theme-context';

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const categoryOptions = ['Áo', 'Quần', 'Đầm', 'Phụ kiện'];
const colorOptions = ['Đen', 'Trắng', 'Be', 'Xanh', 'Hồng'];
const priceOptions = ['< 200K', '200K - 500K', '500K - 1M', '> 1M'];
const sortOptions = ['Tiêu biểu', 'Hàng mới về', 'Từ thấp đến cao', 'Từ cao đến thấp', 'Xếp hạng cao nhất'];

export default function ProductFilter() {
    const { isDarkMode } = useContext(ThemeContext);
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
        <div className={`px-5 pt-2 pb-5 ${ isDarkMode ? "bg-[#32323e]" : "bg-[#FFFFFF]"}  w-auto rounded-2xl shadow-lg ${isDarkMode ? "text-[#FFFFFF]" : "text-[#27272A]"} font-serif`}>
        <div className="flex justify-end">
            <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setOpenDropdown(null)}
            />
        </div>
        <div className="mb-2 font-semibold text-base capitalize">{key}</div>
        <div className="text-sm">
            <Checkbox.Group
            value={selected[key]}
            onChange={values => handleChange(key, values as string[])}
            className="!grid grid-cols-2 justify-between gap-2"
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
            <Button type='default' className="">
            {renderLabel(key as keyof typeof selected, label)} <DownOutlined />
            </Button>
        </Dropdown>
        ))}
    </div>
    <div>
        <Dropdown menu={{ items: sortItems, onClick: handleSortClick }} trigger={['click']}>
        <Button type='text' className="px-4 py-1 !text-lg !font-semibold">
            <FaArrowsDownToLine /> Sắp xếp theo
        </Button>
        </Dropdown>
    </div>
  </div>

  );
}