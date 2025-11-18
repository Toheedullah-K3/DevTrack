import { useState } from 'react'
import Button from './Button'
import ColumnContainer from './ColumnContainer';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';


// types import
import type { Column, Id } from '../types'


function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([])


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
    return (
        <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-10">
            <DndContext>
                <div className='m-auto flex gap-4'>
                    <div className='flex gap-4'>
                        <SortableContext items={}>
                            {columns.map(col => (
                                <ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn} />
                            ))}
                        </SortableContext>
                    </div>
                    <Button onClick={createNewColumn} />
                </div>
            </DndContext>
        </div>


    )
}

export default KanbanBoard