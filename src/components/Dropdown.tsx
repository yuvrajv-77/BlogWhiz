import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface DropdownItem {
  label: string;
  url: string;
  onClick?: () => void;
  icon: React.ReactNode;
  color?: string ;
}

interface DropdownProps {
  items: DropdownItem[];
  buttonText: string | React.ReactNode;
  onSelect?: (item: DropdownItem) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, buttonText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (item: DropdownItem) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block " ref={dropdownRef}>
      <button
        className="py-2 px-2  flex items-center hover:bg-gray-100  rounded-full gap-3"
        onClick={toggleDropdown}
      >
        {buttonText}
      </button>
      
      {isOpen && (
        <div className="absolute mt-2 w-48 border bg-white rounded-lg -right-3 z-10">
          <ul className="p-3">
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.url}
                  className="block p-3 text-md md:text-base font-medium font-blog hover:text-gray-500 w-full text-left"
                  onClick={() => handleItemClick(item)}
                  style={{ color: item.color }}
                >
                  <div className={`flex items-center gap-2  ${item.color}`}>
                    <span className="w-5 h-5">{item.icon}</span>
                    {item.label}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
