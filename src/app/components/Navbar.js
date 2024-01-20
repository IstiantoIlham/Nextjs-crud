import Link from "next/link";

export default function Navbar() {
    return (
        <div className="w-full ">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <div className={"text-xl font-medium"}>Next_CRUD</div>
                <Link href={"create"} className={"m-border !py-2"}>Create</Link>
            </div>
        </div>
    )
}