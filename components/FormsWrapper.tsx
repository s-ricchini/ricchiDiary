import NewDiaryForm from "./NewDiaryForm"
import NewCategoryForm from "./newCategoryForm"

import { getCategories } from "@/queries/categories"

async function FormsWrapper({userId} : {userId :string}){
    //hago un fetch para las categorias
    const cats = await getCategories(userId)

    return(
        <div className="w-full flex flex-col gap-6">
            <NewDiaryForm categories={cats}></NewDiaryForm>
            <NewCategoryForm></NewCategoryForm>
            
        </div>
    )


}

export default FormsWrapper