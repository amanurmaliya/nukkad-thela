import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({ onValueChange, defaultValue, value, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || 'Select');

  // Sync internal state with parent-controlled value
  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  const handleSelect = (val) => {
    setSelected(val);       // Update internal state
    onValueChange(val);     // Notify parent
    setIsOpen(false);       // Close dropdown after selection
  };

  return (
    <div className="relative w-48">
      <button
        className="flex justify-between items-center w-full px-4 py-2 border rounded-lg shadow-sm bg-white text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { onSelect: handleSelect })
          )}
        </div>
      )}
    </div>
  );
};

export const SelectTrigger = ({ children }) => {
  return <>{children}</>;
};

export const SelectContent = ({ children }) => {
  return <div className="py-1">{children}</div>;
};

export const SelectItem = ({ value, children, onSelect }) => {
  return (
    <div
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
      onClick={() => onSelect(value)} // ✅ Ensure onSelect triggers with correct value
    >
      {children}
    </div>
  );
};
