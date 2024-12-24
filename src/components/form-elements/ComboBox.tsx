import React from "react";

interface ComboboxProps {
    element: any;
    onChange: (id: string, value: string) => void;
    value: string;
}

const ComboBox: React.FC<ComboboxProps> = ({ element, onChange, value }) => {
    return (
        <div className="w-full p-4 border rounded shadow">
            <label className="block">{element.label}</label>
            <input
                type="text"
                className="mt-2 w-full p-2 border rounded"
                value={value}
                onChange={(e) => onChange(element.id, e.target.value)}
                placeholder="Enter a value"
            />
        </div>
    );
};

export default ComboBox;
