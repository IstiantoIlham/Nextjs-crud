import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, {params}) {
    const id = parseInt(params.id);
    if (!id) {
        return NextResponse.json({
            message: 'Input Number'
        });
    }

    const result = await prisma.todo.findUnique({
        where: {
            id
        }
    });

    if (!result) {
        return NextResponse.json({
            message: "Id : " + id + " Not Found",
        })
    }
    return NextResponse.json(result);
}

export async function PUT(request, {params}) {
    const id = parseInt(params.id);
    const formData = await request.formData();
    const title = await formData.get('title')
    const content = await formData.get('content')
    const result = await prisma.todo.update({
        where: {
            id
        },
        data: {
            title, content
        }
    })
    return NextResponse.json({
        message: "Data Updated",
        data: result
    })
}

export async function DELETE(request, {params}) {
    const id = parseInt(params.id);
    await prisma.todo.delete({
        where: {
            id
        }
    })
    return NextResponse.json({
        message: "Deleted Data",
    })
}