import Diaries from "@/components/Diaries";
import FormsWrapper from "@/components/FormsWrapper";



export default async function Page(){
    

    return(
        <div className="flex">
            <div className="px-5 flex-1" >
                <p className="text-3xl">Home</p> 
                <Diaries></Diaries>
            </div>
            <div>
                <FormsWrapper></FormsWrapper>
            </div>

        </div>
    )

}