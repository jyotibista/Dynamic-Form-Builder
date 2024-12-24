import React from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import FormElement from "../form/FormElement";
import { Item } from "../../types";
import SortableElement from "./SortableElement";

interface FormCanvasProps {
    elements: Item[];
    setElements: React.Dispatch<React.SetStateAction<Item[]>>;
    onRemoveElement: (id: string) => void;
}

export default function FormCanvas({
    elements,
    setElements,
    onRemoveElement,
}: FormCanvasProps) {
    // Handle the drag end event for reordering
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        // Only handle reordering if the active item is not dropped over itself
        if (active.id !== over?.id) {
            const oldIndex = elements.findIndex((item) => item.id === active.id);
            const newIndex = elements.findIndex((item) => item.id === over?.id);

            // Reorder the elements array
            const updatedElements = [...elements];
            const [movedItem] = updatedElements.splice(oldIndex, 1);
            updatedElements.splice(newIndex, 0, movedItem);
            setElements(updatedElements);
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <SortableContext
                items={elements.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-4">
                    {elements.map((el) => (
                        <SortableElement key={el.id} id={el.id}>
                            <FormElement
                                type={el.type}
                                label={el.label}
                                id={el.id}
                                onRemove={onRemoveElement}
                            />
                        </SortableElement>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}