import { useState } from "react";
import FormCanvas from "./FormCanvas";
import FormPreview from "./FormPreview";
import FormElementSelector from "./FormElementSelector";

export default function FormBuilder() {
    const [elements, setElements] = useState<any[]>([]);

    const handleAddElement = (type: string) => {
        const newElement = {
            id: `${type}-${Date.now()}`,
            type,
            label: `New ${type}`,
            validation: {},
        };
        setElements([...elements, newElement]);
    };

    const handleRemoveElement = (id: string) => {
        setElements(elements.filter((el) => el.id !== id));
    };

    return (
        <div className="grid grid-cols-12 min-h-screen">
            {/* Left Panel */}
            <div className="col-span-2 bg-gray-100 p-4">
                <FormElementSelector onAddElement={handleAddElement} />
            </div>

            {/* Middle Panel */}
            <div className="col-span-4 bg-white border-x border-gray-300 p-4">
                <FormCanvas
                    elements={elements}
                    setElements={setElements}
                    onRemoveElement={handleRemoveElement}
                />
            </div>

            {/* Right Panel */}
            <div className="col-span-6 bg-gray-50 p-4">
                <FormPreview elements={elements} />
            </div>
        </div>
    );
}
