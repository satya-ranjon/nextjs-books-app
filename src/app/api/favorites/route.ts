import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { bookId } = await request.json();
    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        bookId,
      },
    });
    return NextResponse.json(favorite);
  } catch (error) {
    console.error("Error adding favorite:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { bookId } = await request.json();
    await prisma.favorite.delete({
      where: {
        userId_bookId: {
          userId: session.user.id,
          bookId,
        },
      },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error removing favorite:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
