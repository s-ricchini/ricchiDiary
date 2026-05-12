'use client'


import { TrashIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { deleteCategoryAction } from "@/actions/categoriesActions"
import { toast } from "sonner"


function DeleteCategory({id}: {id:string }){
    
    const router = useRouter()

    async function handleDelete() {
        const result = await deleteCategoryAction(id)

        if(result.success){
            toast.success("Category deleted")
            router.push('/dashboard')
        } else{
            toast.error(result.error)
        }

    }
    
    return(
        <button className=" flex w-min p-2  rounded gap-1 bg-red-700 text-white hover:bg-red-500 cursor-pointer" onClick={handleDelete}>
            <p>Delete Category</p>
            <TrashIcon className="w-6 h-6 text-white"></TrashIcon>
        </button>
        
    )

}

export default DeleteCategory