import connectToDatabase from "@/utils/dbConnection";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { db } = await connectToDatabase();

  const req = await request.json();
  const { id, result } = req;
  let date = new Date();

  const data = {
    ...result,
    date,
  };

  // users collectionunda id değeri id olan kullanıcının history arrayinin başına date objesini ekleyin.
  const user = await db.collection("users").updateOne(
    { id },
    {
      $push: {
        history: {
          $each: [data],
          $position: 0,
        },
      },
    }
  );

  return NextResponse.json({
    user,
    message: "History eklendi.",
  });
}

export async function GET(request) {
  const { db } = await connectToDatabase();

  //   const req = request.query;
  //   const { id } = req;

  //   const user = await db.collection("users").findOne({ id });

  return NextResponse.json({
    message: "History getirildi.",
  });
}
