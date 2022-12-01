import { useState, useContext , useEffect } from "react";
import {UserContext} from "../../UserContext";

function Main(){
    console.log("UserContext in Main:", useContext(UserContext));

    const [count, setCount] = useState(0);

    useEffect(() =>{
        const data = localStorage.getItem("count-in-main");
        if (data) {
            setCount(JSON.parse(data));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("count-in-main", JSON.stringify(count));
        document.title = `You clicked ${count} times`;
    })
    
    return (
        <div>
            <h1>This is main</h1>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click Me
            </button>
        </div>
    )
};

export default Main;
