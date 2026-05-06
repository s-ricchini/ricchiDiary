import Diaries from "@/components/Diaries";
import NewCatWidget from "@/components/NewCatWidget";


export default function Page(){
    return(
        <div className="flex">
            <div className="px-5">
                <p className="text-3xl">Home</p> 
                <Diaries></Diaries>
            </div>
            <div>
                <NewCatWidget></NewCatWidget>
            </div>

        </div>
    )

}