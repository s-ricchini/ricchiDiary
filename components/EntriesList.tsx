
import { getAllEntrys } from "@/queries/entries";
import EntryCard from "./EntryCard";

export default async function EntriesList({id} : {id: string}) {
    const entries = await getAllEntrys(id)
    const entriesComponent = entries.map(entry => <EntryCard key={entry.id} entry={entry}></EntryCard> )

    return(
        <div className="flex flex-col gap-3">
            {entriesComponent}
        </div>
    )

}