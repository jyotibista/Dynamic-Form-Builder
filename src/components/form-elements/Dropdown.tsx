import React from "react";

interface DropdownProps {
    element: any;
    onChange: (id: string, value: string) => void;
    value: string;
}

const Dropdown: React.FC<DropdownProps> = ({ element, onChange, value }) => {
    return (
        <div className="w-full p-4 border rounded shadow">
            <label className="block">{element.label}</label>
            <select
                className="mt-2 w-full p-2 border rounded"
                value={value}
                onChange={(e) => onChange(element.id, e.target.value)}
            >
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
            </select>
        </div>
    );
};

export default Dropdown;
