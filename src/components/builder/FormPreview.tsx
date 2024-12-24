import FormElement from "../form/FormElement";

interface FormPreviewProps {
    elements: any[];
}

export default function FormPreview({ elements }: FormPreviewProps) {
    return (
        <div>
            <h2 className="text-xl font-semibold">Form Preview</h2>
            <div className="border border-gray-300 p-4 rounded-md bg-white">
                {elements.map((el) => (
                    <FormElement key={el.id} type={el.type} label={el.label} id={el.id} onRemove={() => { }} />
                ))}
            </div>
        </div>
    );
}
