import { useMemo, useState } from 'react'
import Button from './Button'
import ColumnContainer from './ColumnContainer';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';


// types import
import type { Column, Id } from '../types'
import { createPortal } from 'react-dom';


function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([])
    const columnsId = useMemo(() => columns.map(col => col.id), [columns])

    const [activeColum, setActiveColumn] = useState<Column | null>()

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 3, 
        }
    }))
    // ** Functions

    function createNewColumn() {
        const columnsToAdd: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`,
        };

        setColumns([...columns, columnsToAdd])
    }

    function deleteColumn(id: Id) {
        const filteredColumn = columns.filter((col) => col.id !== id)
        setColumns(filteredColumn)
    }

    function generateId() {
        return Math.floor(Math.random() * 10001)
    }

    function onDragStart(event: DragStartEvent) {
        console.log("DRAG Start", event)   
        if(event.active.data.current?.type === "Column"){
            setActiveColumn(event.active.data.current.column)
            return;
        }
    }

    function updateColumn(id: Id, title: string){
        const newColumns = columns.map(col => {
            if(col.id !== id) return col;
            return {...col, title}
        })
        setColumns(newColumns)
    }
    function onDragEnd(event: DragEndEvent){
        const {active, over} = event;

        if(!over) return;

        const activeColumnId = active.id;
        const overColumnId = over.id;

        if(activeColumnId === overColumnId) return;

        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex(
                (col) => col.id === activeColumnId
            )

            const overColumnIndex = columns.findIndex(
                (col) => col.id === overColumnId
            )

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        })
    }


    return (
        <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-10">

            <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <div className='m-auto flex gap-4'>
                    <div className='flex gap-4'>
                        <SortableContext items={columnsId}>
                            {columns.map(col => (
                                <ColumnContainer 
                                    key={col.id} 
                                    column={col} 
                                    deleteColumn={deleteColumn} 
                                    updateColumn={updateColumn}
                                    />
                            ))}
                        </SortableContext>
                    </div>
                    <Button onClick={createNewColumn} />
                </div>
                {createPortal(
                    <DragOverlay>
                    {activeColum && (
                        <ColumnContainer
                            column={activeColum}
                            deleteColumn={deleteColumn}
                            updateColumn={updateColumn}
                        >
                        
                        </ColumnContainer>
                    )}
                </DragOverlay>,
                document.body
                )}
            </DndContext>
        </div>


    )
}

export default KanbanBoard