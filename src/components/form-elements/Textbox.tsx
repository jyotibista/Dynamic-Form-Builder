import React from "react";

interface TextboxProps {
  element: any;
  onChange: (id: string, value: string) => void;
  value: string;
}

const Textbox: React.FC<TextboxProps> = ({ element, onChange, value }) => {
  return (
    <div className="w-full p-4 border rounded shadow">
      <label className="block">{element.label}</label>
      <input
        type="text"
        className="mt-2 w-full p-2 border rounded"
        value={value}
        onChange={(e) => onChange(element.id, e.target.value)}
        placeholder="Enter text"
      />
    </div>
  );
};

export default Textbox;
