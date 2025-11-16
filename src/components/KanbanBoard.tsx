import { useState } from 'react'
import Button from './Button'
import ColumnContainer from './ColumnContainer';

// types import
import type { Column } from '../types'


function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([])


    // ** Functions

    function createNewColumn() {
        const columnsToAdd: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`,
        };

        console.log(columnsToAdd)
        setColumns([...columns, columnsToAdd])
    }


    function generateId() {
        return Math.floor(Math.random() * 10001)
    }
    return (
        <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-10">
            <div className='m-auto flex gap-4'>
                <div className='flex gap-4'>
                    {columns.map(col => (
                        <ColumnContainer column={col}/>
                    ))}
                </div>
                <Button onClick={createNewColumn} />
            </div>
        </div>


    )
}

export default KanbanBoard