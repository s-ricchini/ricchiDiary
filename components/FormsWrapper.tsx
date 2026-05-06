import NewDiaryForm from "./NewDiaryForm"
import NewCategoryForm from "./newCategoryForm"

import { getCategories } from "@/queries/categories"

async function FormsWrapper(){
    //hago un fetch para las categorias
    const cats = await getCategories()

    return(
        <div className="w-full">
            <h1>HOLA</h1>
            <NewDiaryForm categories={cats}></NewDiaryForm>
            <NewCategoryForm></NewCategoryForm>
            
        </div>
    )


}

export default FormsWrapper