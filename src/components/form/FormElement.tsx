interface FormElementProps {
    type: string;
    label: string;
    id: string;
    onRemove: (id: string) => void;
}

export default function FormElement({
    type,
    label,
    id,
    onRemove,
}: FormElementProps) {
    return (
        <div className="space-y-2 p-4 border rounded-md">
            <label className="block font-medium">{label}</label>
            {type === "textbox" && <input type="text" className="border p-2 w-full" />}
            {type === "dropdown" && (
                <select className="border p-2 w-full">
                    <option>Select...</option>
                </select>
            )}
            {type === "radio" && (
                <div>
                    <input type="radio" /> Option 1
                    <input type="radio" /> Option 2
                </div>
            )}
            {type === "checkbox" && <input type="checkbox" />}
            <button onClick={() => onRemove(id)} className="text-red-500">Remove</button>
        </div>
    );
}
