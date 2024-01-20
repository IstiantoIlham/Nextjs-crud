"use client"

import axios from "axios";
import {useState} from "react";
import {useRouter} from "next/navigation";
import useSWR from "swr";
import {fetcher} from "@/app/lib/helper";

export default function EditPage({params}) {
    const id = params.id;
    const router = useRouter()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const updateHandler = () => {
        axios.putForm(`/api/posts/${id}`, {
            title, content
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error)
        });
        router.push("/")
    }

    const {data, error, isLoading} = useSWR('/api/posts/' + id, fetcher);
    if (isLoading) return <div>Loading</div>
    if (error) return <div>Error</div>
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            updateHandler();
        }} className={"flex flex-col gap-4"}>
            <input defaultValue={data?.title ?? title} onChange={(e) => setTitle(e.target.value)}
                   placeholder={"Insert your title here"}/>
            <textarea defaultValue={data?.content ?? content} rows="4" onChange={(e) => setContent(e.target.value)}
                      placeholder={"Insert your content here"}></textarea>
            <button type={"submit"} className={"m-border "}>Submit</button>
        </form>
    )
}