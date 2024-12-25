'use client'

import React, { useState, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PlusCircle, LayoutGrid, Eye, Code, GripVertical, Trash2, Edit } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import FormPreview from './FormPreview'
import CodeGenerator from './CodeGenerator'
import ElementEditor from './ElementEditor'
import { ElementType, FormElement, Layout } from '@/types/formBuilder'

const initialElements: FormElement[] = [
    { id: 'input-1684761600000', type: 'text', label: 'Name', required: true },
    { id: 'input-1684761600001', type: 'email', label: 'Email', required: true },
    { id: 'input-1684761600002', type: 'textarea', label: 'Message', required: false },
]

export default function FormBuilder() {
    const [elements, setElements] = useState<FormElement[]>(initialElements)
    const [layout, setLayout] = useState<Layout>('responsive')
    const [activeTab, setActiveTab] = useState('editor')
    const [editingElement, setEditingElement] = useState<FormElement | null>(null)

    const onDragEnd = useCallback((result: DropResult) => {
        if (!result.destination) return

        const newElements = Array.from(elements)
        const [reorderedItem] = newElements.splice(result.source.index, 1)
        newElements.splice(result.destination.index, 0, reorderedItem)

        setElements(newElements)
    }, [elements])

    const addElement = useCallback((type: ElementType) => {
        const newElement: FormElement = {
            id: `input-${Date.now()}`,
            type,
            label: `New ${type} input`,
            required: false,
        }

        // Add default options for elements that need them
        if (type === 'radio' || type === 'checkbox' || type === 'select' || type === 'combobox') {
            newElement.options = [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
            ]
        }

        setElements((prevElements) => [...prevElements, newElement])
    }, [])

    const removeElement = useCallback((id: string) => {
        setElements((prevElements) => prevElements.filter((element) => element.id !== id))
        if (editingElement && editingElement.id === id) {
            setEditingElement(null)
        }
    }, [editingElement])

    const updateElement = useCallback((id: string, updates: Partial<FormElement>) => {
        setElements((prevElements) =>
            prevElements.map((element) =>
                element.id === id ? { ...element, ...updates } : element
            )
        )
        setEditingElement((prevEditingElement) =>
            prevEditingElement && prevEditingElement.id === id
                ? { ...prevEditingElement, ...updates }
                : prevEditingElement
        )
    }, [])

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Form Builder</h1>
            <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
                <Select value={layout} onValueChange={(value: Layout) => setLayout(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="responsive">Responsive</SelectItem>
                        <SelectItem value="1">One Column</SelectItem>
                        <SelectItem value="2">Two Columns</SelectItem>
                        <SelectItem value="3">Three Columns</SelectItem>
                        <SelectItem value="4">Four Columns</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={() => addElement('text')} variant="outline" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Text
                    </Button>
                    <Button onClick={() => addElement('email')} variant="outline" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Email
                    </Button>
                    <Button onClick={() => addElement('textarea')} variant="outline" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Textarea
                    </Button>
                    <Button onClick={() => addElement('file')} variant="outline" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        File
                    </Button>
                    <Button onClick={() => addElement('location')} variant="outline" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Location
                    </Button>
                    <Button onClick={() => addElement('datetime')} variant="outline" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Date Time
                    </Button>
                    <Button onClick={() => addElement('slider')} variant="outline" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Slider
                    </Button>
                    <Button onClick={() => addElement('radio')} variant="outline" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Radio
                    </Button>
                    <Button onClick={() => addElement('checkbox')} variant="outline" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Checkbox
                    </Button>
                    <Button onClick={() => addElement('select')} variant="outline" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Select
                    </Button>
                    <Button onClick={() => addElement('phone')} variant="outline" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Phone
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="editor">
                        <LayoutGrid className="w-4 h-4 mr-2" />
                        Editor
                    </TabsTrigger>
                    <TabsTrigger value="preview">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                    </TabsTrigger>
                    <TabsTrigger value="code">
                        <Code className="w-4 h-4 mr-2" />
                        Code
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="editor" className="border-none p-0">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Form Elements</h2>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="form-elements">
                                    {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                                            {elements.map((element, index) => (
                                                <Draggable key={element.id} draggableId={element.id} index={index}>
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
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Element Editor</h2>
                            {editingElement && (
                                <ElementEditor
                                    key={editingElement.id}
                                    element={editingElement}
                                    updateElement={updateElement}
                                    setEditingElement={setEditingElement}
                                />
                            )}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="preview" className="border-none p-0">
                    <FormPreview elements={elements} layout={layout} />
                </TabsContent>
                <TabsContent value="code" className="border-none p-0">
                    <CodeGenerator elements={elements} layout={layout} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

