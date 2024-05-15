import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
    const s1 ={
        "name" : "Sushil",
        "standard" : "5th"
    }
    const [state, setState] = useState(s1)
    const update = () =>{
        setTimeout(()=>{
            setState({
                "name" : "Bhusil",
                "standard": "6th"
            })
        },3000)
    }
    return(
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
