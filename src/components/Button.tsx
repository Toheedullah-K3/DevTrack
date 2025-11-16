import PlusIcon from "../icons/PlusIcon"
import type { MouseEventHandler } from "react"

interface ClickProp {
  onClick: MouseEventHandler<HTMLButtonElement>
}


function Button({onClick}: ClickProp) {
  return (
        <button 
            type="submit"
            onClick={onClick} 
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2">
                <PlusIcon />
            Submit
        </button>
  )
}

export default Button