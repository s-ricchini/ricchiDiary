'use client'

import { useState,useEffect } from "react"
import { toast } from "sonner";
import { HexColorPicker } from "react-colorful";
import { useActionState } from "react";
import { createNewCategory } from "@/actions/categoriesActions";

//icons
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

function NewCategoryForm(){
    
    const [activeColorPicker,setActiveColorPicker] = useState(false)
    const [color,setColor] = useState("#000000")

    const [state,action,isPending] = useActionState(createNewCategory ,null)
    
    useEffect(() => {
        if(state?.success){
            toast.success('Category created')
        }
        if(state?.error){
            toast.error("Error creating the category")
        }

    },[state])
    
    return(

        <form action={action} className="bg-white border border-gray-300 rounded p-4 text-lg flex">
            <input type="text" name="name"></input>
            <input type="hidden" name="color" value={color}/>

            <button type="button" onClick={() => {setActiveColorPicker(prev => !prev)}}>
                <span>Choose Color</span>
                {activeColorPicker ? <ChevronDownIcon className="w-6 h-6 text-gray-400"></ChevronDownIcon> : <ChevronUpIcon className="w-6 h-6 text-gray-400"></ChevronUpIcon>}
            </button>
            
            {activeColorPicker && <HexColorPicker color={color} onChange={setColor}></HexColorPicker>}

            <input type="submit" value={"Create"} disabled={isPending}></input>
        </form>

    )


}

export default NewCategoryForm