import { Entry, } from "@/types/types";
import DeleteButton from "./DeleteButton";


export default function EntryCard({entry}: {entry: Entry }){
    return(
    
        <div className="bg-white border border-gray-200 flex flex-col p-4 gap-2">
            <div className="flex justify-between">
                <p className="font-medium">{entry.title}</p>
                <p className="text-gray-600">{new Date(entry.created_at).toLocaleString('es-AR')}</p>
            </div>
            
            <p>{entry.content}</p>
            <DeleteButton id={entry.id} text="Delete"></DeleteButton>
        </div>
        
    )


}