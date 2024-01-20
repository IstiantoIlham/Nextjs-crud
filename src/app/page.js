"use client";

import {fetcher} from "./lib/helper"
import useSWR from "swr";
import Card from "@/app/components/Card";
import axios from "axios";
import Link from "next/link";

export default function Home() {
    const deleteHandler = (id) => {
        axios.delete('/api/posts/' + id).then(() => {
            console.log(`Deleted post with ID ${id}`);
        })
            .catch(error => {
                console.error(error);
            });
        window.location.reload(false);
    }

    const {data, error, isLoading} = useSWR('/api/posts', fetcher);
    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading</div>;
    if (error) return <div className="flex justify-center items-center h-screen">Error</div>;
    return (
        <div className={"flex flex-col-reverse gap-4"}>
            {data.result.map((data, index) => {
                const date = new Date(data.createdAt).toLocaleDateString();
                return (
                    <div key={index}>
                        <Card title={data.title} created={date} props={
                            <div className={"flex gap-4"}>
                                <Link href={`detail/${data.id}`}>Detail</Link>
                                <Link href={`edit/${data.id}`}>Edit</Link>
                                <button onClick={() => deleteHandler(data.id)}>Delete
                                </button>
                            </div>
                        }/>
                    </div>
                );
            })}
        </div>
    );
}
