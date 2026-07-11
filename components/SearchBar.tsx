'use client'
import { StarIcon, ArrowUpIcon, ArrowDownIcon, MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline"
import { useRouter, useSearchParams } from "next/navigation";

function SearchBar(){
    const router = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    //estados acutales de los filtros

    function searchByName(){


    }

    function toggleFavs(){
        if(params.has("favorites")){
            params.delete("favorites")
        } else{
            params.set("favorites", "true");
        }
        
        router.push(`/dashboard?${params.toString()}`);
    }

    function getNewests(){

    }

    function getOldest(){

    }

    return(
        <div className="bg-white border p-2 border-gray-300 flex gap-3">
        
            <form className="flex items-center border border-gray-300 p-2" onSubmit={() => {}}>
                <input type="text" placeholder="Search Diary"></input>
                <button type="submit">
                    <MagnifyingGlassCircleIcon className="w-7 h-7 text-gray-600 cursor-pointer"></MagnifyingGlassCircleIcon>
                </button>
            </form>
            <div className="flex gap-2 items-center">
                <StarIcon onClick={toggleFavs} title="Favs" className={`w-6 h-6 ${params.has("favorites") ? "fill-gray-900" : "text-gray-600"} cursor-pointer`}></StarIcon>
                <ArrowUpIcon title = "Newests" className="w-6 h-6 text-gray-600 cursor-pointer"></ArrowUpIcon>
                <ArrowDownIcon title= "Oldests" className="w-6 h-6 text-gray-600 cursor-pointer"></ArrowDownIcon>
            </div>

        </div>

    )


}

export default SearchBar