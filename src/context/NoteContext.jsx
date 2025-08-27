import { createContext, useEffect, useState } from "react";

const NoteContext = createContext();

export function NoteProvider({ children, user }){
    const [notes, setNotes] = useState("");

    return(
        <NoteContext.Provider value={{ user }}>
            {children}
        </NoteContext.Provider>
    );
}

export default NoteContext;