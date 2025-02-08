import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, author, coverImage, description } = body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        coverImage,
        description,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.error("Error creating book:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
