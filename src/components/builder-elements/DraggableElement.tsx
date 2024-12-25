import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, GripVertical, Edit } from 'lucide-react'
import { FormElement } from '../../types/formBuilder'

interface DraggableElementProps {
    element: FormElement
    index: number
    removeElement: (id: string) => void
    setEditingElement: (element: FormElement) => void
}

export default function DraggableElement({
    element,
    index,
    removeElement,
    setEditingElement,
}: DraggableElementProps) {
    return (
        <Draggable draggableId={element.id} index={index}>
            {(provided, snapshot) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`group transition-shadow ${snapshot.isDragging ? 'shadow-lg' : ''
                        }`}
                >
                    <CardContent className="p-2 flex items-center justify-between">
                        <div
                            {...provided.dragHandleProps}
                            className="cursor-move opacity-50 group-hover:opacity-100 transition-opacity"
                        >
                            <GripVertical className="w-5 h-5" />
                        </div>
                        <span className="font-medium">{element.label}</span>
                        <span className="text-sm text-gray-500">{element.type}</span>
                        <div className="flex space-x-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setEditingElement(element)}
                                className="opacity-50 group-hover:opacity-100 transition-opacity"
                            >
                                <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeElement(element.id)}
                                className="opacity-50 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </Draggable>
    )
}

