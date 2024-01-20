export default function Card({title, props, created}) {
    return (
        <div className={"flex flex-row gap-4 m-border justify-between items-center"}>
            <div className={"flex flex-col overflow-hidden"}>
                <div className={"text-xl font-medium truncate"}>{title ?? "Default Title"}</div>
                <div className={"text-slate-300/50"}>Created at: {created ?? "Default Created"}</div>
            </div>
            {props}
        </div>
    )
}