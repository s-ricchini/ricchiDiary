import NewDiaryForm from "./NewDiaryForm"
import NewCategoryForm from "./newCategoryForm"

import { getCategories } from "@/queries/categories"

async function NewCatWidget(){
    //hago un fetch para las categorias
    const cats = await getCategories()

    return(
        <div>
            <h1>HOLA</h1>
            <NewDiaryForm categories={cats}></NewDiaryForm>
            <NewCategoryForm></NewCategoryForm>
            
        </div>
    )


}

export default NewCatWidget