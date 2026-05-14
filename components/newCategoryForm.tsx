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
            toast.error(state.error)
        }
        setActiveColorPicker(false)

    },[state])
    


    return(

        <div className="space-y-3">
            <h2 className="text-xl font-medium text-gray-800">Create new category</h2>
            <form action={action} className="bg-white border border-gray-300 rounded p-4 text-lg flex flex-col gap-4">
                <div className="flex">
                    <input type="text" name="name"  placeholder="New category name"required></input>
                    <input type="hidden" name="color" value={color}/>

                    <button type="button" className="flex items-center align-middle" onClick={() => {setActiveColorPicker(prev => !prev)}}>
                        <span>Choose Color</span>
                        {activeColorPicker ? <ChevronDownIcon className="w-6 h-6 text-gray-400"></ChevronDownIcon> : <ChevronUpIcon className="w-6 h-6 text-gray-400"></ChevronUpIcon>}
                    </button>
                    <input className="bg-gray-900 text-white p-3 text-lg" type="submit" value={"Create"} disabled={isPending}></input>
                </div>
                {activeColorPicker && <HexColorPicker color={color} onChange={setColor}></HexColorPicker>}
            </form>
        </div>

    )


}

export default NewCategoryForm