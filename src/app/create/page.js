"use client"

import axios from "axios";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function CreatePage() {
    const router = useRouter()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const postHandler = () => {
        axios.postForm('/api/posts', {
            title, content
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error)
        });
        router.push("/")
    }
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            postHandler();
        }} className={"flex flex-col gap-4"}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={"Insert your title here"}/>
            <textarea rows="4" onChange={(e) => setContent(e.target.value)} placeholder={"Insert your content here"} value={content}></textarea>
            <button type={"submit"} className={"m-border "}>Submit</button>
        </form>
    )
}