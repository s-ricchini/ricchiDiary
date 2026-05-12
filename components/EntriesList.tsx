
import { getAllEntrys } from "@/queries/entries";
import EntryCard from "./EntryCard";
import { getUserId } from "@/utils/userId";
import { redirect } from "next/navigation";

export default async function EntriesList({id} : {id: string}) {
    
    let userId = ''

    try {
        userId = await getUserId()
    } catch (error) {
        redirect('/login')
    }
    
    const entries = await getAllEntrys(userId,id)
    const entriesComponent = entries.map(entry => <EntryCard key={entry.id} entry={entry}></EntryCard> )

    return(
        <div className="flex flex-col gap-3">
            {entriesComponent}
        </div>
    )

}