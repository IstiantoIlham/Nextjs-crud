import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

export async function GET() {
    const todos = await prisma.todo.findMany()
    try {
        return NextResponse.json({message: 200, result: todos})
    } catch (err) {
        return NextResponse.json({err: err})
    }
}

export async function POST(request) {
    const formData = await request.formData();
    const title = formData.get('title');
    const content = formData.get('content');

    const result = await prisma.todo.create({
        data: {
            title,
            content
        }
    });
    return NextResponse.json({data: result});
}