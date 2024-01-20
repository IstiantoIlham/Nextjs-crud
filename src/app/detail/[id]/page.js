"use client"
import useSWR from "swr";
import {fetcher} from "@/app/lib/helper";

export default function DetailPage({params}) {
    const id = params.id
    const {data, error, isLoading} = useSWR(`/api/posts/${id}`, fetcher)
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error</div>
    const date = new Date(data?.createdAt).toLocaleDateString();
    return (
        <div className={"m-border flex flex-col gap-8 overflow-hidden"}>
            <div className={""}>
                <div className={"text-3xl font-medium "}>{data?.title}</div>
                <div className={"text-slate-300/50"}>Created at : {date}</div>
            </div>
            <div>{data?.content}</div>
        </div>
    )
}