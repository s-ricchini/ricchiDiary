import EntriesList from "@/components/EntriesList"
interface Props {
    searchParams: Promise<{id?:string, name?:string, category?:string, color?:string}>
}

export default async function Page({searchParams} : Props) {

    const {id,name,category,color} = await searchParams
    console.log(name)
    
    return(
        <div className="p-3">
            <div>
                <p className="text-2xl">{name}</p>
                <p>{category ? category : ""}</p>
                <p>{color ? color : ""}</p>
            </div>
            <EntriesList id={id!}></EntriesList>
        </div>
    )
    


}