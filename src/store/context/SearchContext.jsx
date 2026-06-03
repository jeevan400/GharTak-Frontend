import { createContext, useState } from "react";


export const SearchContext = createContext();

export const SearchProvider = ({children})=>{

    const [search, setSearch] = useState("");
    const [isCart, setIsCart] = useState(0);

    return (
    <SearchContext.Provider value={{search, setSearch, isCart, setIsCart}}>
        {children}
    </SearchContext.Provider>
)
}
