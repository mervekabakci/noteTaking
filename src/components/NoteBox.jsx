import { useContext, useEffect, useState } from "react";
import NoteContext from "../context/NoteContext";

export default function NoteBox(){
    const { user } = useContext(NoteContext);
    const [notes, setNotes] = useState([]);

    async function handleSubmit(e){
        e.preventDefault();

        if(!user || !user.token){
            console.error("No valid token, please login again");
            return;
        }

        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData);

        try{
            const res = await fetch('https://notes.muratakdemir.tr/Note', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${user.token}`,
                },
                body:JSON.stringify({
                    title:formObj.title || "",
                    text:formObj.noteHere || "",
                    tags:formObj.tags ? formObj.tags.split(",") : [],
                })
            });

            if(res.status === 401){
                console.warn("Tokan expired or invalid. Loggin out...");
                localStorage.removeItem("data");
                window.location.reload();
                return;
            }

            if(!res.ok){
                const text = await res.text();
                throw new Error(`HTTP ${res.status} - ${text}`);
            }

            const data = await res.json();
            console.log("added note: ", data);

            // setNotes(prev => {
            //     const updated = [...prev, data];
            //     localStorage.setItem("notes", JSON.stringify(updated));
            //     return updated;
            // });
            // setNotesId(prev => {
            //     const updatedIds = [...prev, data.id];
            //     localStorage.setItem("notesId", JSON.stringify(updatedIds));
            //     return updatedIds;
            // });

            e.target.reset();

        }catch(err){
            console.error("Failed to save note:", err);
        }
    }


    async function getnoteApi(){
        // if(!user?.token || notesId.length === 0) return;
        if(!user?.token) return;

        // const fetchNotes = [];
        for (const id of notesId){
            try{
                const res = await fetch(`https://notes.muratakdemir.tr/Note/${id}`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if(!res.ok){
                    const text = await res.text();
                    console.error(`Failed note ${id}: ${text}`);
                    continue;
                }
                const data = await res.json();
                fetchNotes.push(data);
                console.log("all notes :", data)
            }catch(err){
                console.error(`Error fetch note ${id}: `, err)
            }
        }
        // setNotes(fetchNotes);
    }

    useEffect(() => {
        if(user?.token){
        // if(user?.token && notesId.length > 0){
            getnoteApi();
        }
    },[user?.token]);

        
    function handleClick(){
        console.log("tıkladım")
    }

    return(
        <>
            <button onClick={handleClick}>Yeni  Note Ekle</button>

            <div className="newNoteBox">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <input type="text" name="title" placeholder="Enter a title" />
                    <br />
                    <input type="text" name="tags" placeholder="tag" />
                    <br />
                    <div>eklenme tarihi otomatik gelecek</div>
                    <br />
                    <textarea name="noteHere" id="" placeholder="Start typing your note here..."></textarea>
                    <br />
                    <button>Save Note</button>
               </form>

            </div>
            <div className="noteList">
                {notes.length === 0 ? (
                    <p>No notes yet</p>
                ):(
                    notes.map(note => (
                        <div key={note.id} className="noteItem">
                            <h3>{note.title}</h3>
                            <p>{note.text}</p>
                            {note.tags?.length > 0 && (
                                <small>Tags: {note.tags.join(", ")}</small>
                            )}
                            <p>Date : {note.createdOn}</p>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}