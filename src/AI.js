import { useEffect, useState } from "react"
import "./Styles/AI.css"
import Markdown from "react-markdown"
import logoimg from "./Images/logo.png"

function AI() {

    // const [messages, setMessages] = useState([{ sender: "user", content: "hii" }, { sender: "ai", content: "hello dear" }, { sender: "user", content: "hey, won't you come to my room" }, { sender: "user", content: "i'll let you in on a secret" }, { sender: "ai", content: "and then ?" }, { sender: "user", content: "then i ask you to make it again sometime." }, { sender: "user", content: "then i ask you to make it again sometime." }, { sender: "user", content: "then i ask you to make it again sometime." }, { sender: "user", content: "then i ask you to make it again sometime." }, { sender: "user", content: "then i ask you to make it again sometime." }, { sender: "user", content: "then i ask you to make it again sometime." }, { sender: "user", content: "then i ask you to make it again sometime." }, { sender: "user", content: "then i ask you to make it again sometime." }, { sender: "user", content: "then i ask you to make it again sometime." }, { sender: "user", content: "then i ask you to make it again sometime." }, { sender: "ai", content: "then i ask you to make it again sometime aldjjf s dfads  df sd df aadsd f f as fa dg sdg sdg dsg asd gs ga dsdsg asef ads adsg fdgh fdg sdfg dsd f s fads fasddf aes f dsf dsf sd f dsa  df as fest ret et ew te te  g ewrt te t t qwf q qewt e te fq  et ret  trhy trhtr r twrtwer ." }])
    const [messages, setMessages]=useState([])



    useEffect(()=>{
        let all_messages=document.getElementById("chat-section")
        all_messages.scrollTop=all_messages.scrollHeight
    },[messages])

    async function sendMessage() {
        const data = await document.getElementById("message-bar").value.trim()
        const time = new Date().toString().slice(4,21)
        if(data===""){
            return
        }
        const msg = {time: time, content: data, sender: "user"}
        // setMessages([...messages, msg])
        // console.log(typeof msg)
        // console.log(typeof msg.content)
        // console.log(typeof msg.time)
        document.getElementById("message-bar").value=""

        // console.log(msg)

        // console.log(messages)

        await askAI(msg)

        // setMessages([...messages, reply])
    }

    async function askAI(data) {
        // setMessages([...messages, data])
        // console.log(data)
        // console.log(typeof data.content)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/ai`, {
        // await fetch("http://localhost:8123/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                // { prompt : data }
                { prompt : data.content }
            )
        }).then(async (r1) => {
            const ans = await r1.text()
            const time = new Date().toString().slice(4,21)
            const msg = {time: time, content: ans, sender:"ai"}

            setMessages([...messages, data, msg])
            // setMessages([...messages, data])
            // return msg

            // console.log("previous messages ---")
            // console.log(messages)
            // setMessages([...messages, msg])
            // console.log("now")
            // console.log(messages)
        })
    }

    return (
        <>
            <div id="brand-name">
                <img id="logo-img" src={logoimg} />
                ALICE
            </div>
            <div id="chat-section">
                {
                    messages.map((msg) =>
                        <div className="message-block" style={msg.sender === "ai" ? { flexDirection: "row" } : { flexDirection: "row-reverse" }}>

                            <div className="message-block-body" >
                                <div className="message-block-data-section" style={msg.sender === "ai" ? { flexDirection: "row" } && {overflow: "scroll"} : { flexDirection: "row-reverse" }}>
                                    <Markdown>{msg.content.toString()}</Markdown>
                                </div>

                                <div className="message-block-time-secion" style={msg.sender === "ai" ? { flexDirection: "row" } : { flexDirection: "row-reverse" }}>
                                    {msg.time}
                                </div>
                            </div>

                        </div>
                    )
                }
            </div>

            <div id="message-typing-section">
                <input id="message-bar" type="text" placeholder="Ask a Question..." />
                {/* <button id="send-btn">Send</button> */}
                <button id="send-btn" onClick={() => { sendMessage() }}>&#10147;</button>
            </div>
        </>
    )
}

export default AI