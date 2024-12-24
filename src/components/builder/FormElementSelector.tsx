interface ElementSelectorProps {
    onAddElement: (type: string) => void;
}

export default function FormElementSelector({
    onAddElement,
}: ElementSelectorProps) {
    const elements = ["TextBox", "Dropdown", "Radio", "Checkbox"];

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Form Elements</h2>
            {elements.map((el) => (
                <button
                    key={el}
                    onClick={() => onAddElement(el.toLowerCase())}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {el}
                </button>
            ))}
        </div>
    );
}
