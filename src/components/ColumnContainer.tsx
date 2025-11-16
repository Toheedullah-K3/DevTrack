import type { Column } from "../types"

interface Props {
    column: Column
}
function ColumnContainer({column}: Props) {

  return (
    <div className="
        bg-gray-500
    ">{column.title}</div>
  )
}

export default ColumnContainer