import connectToDatabase from "@/utils/dbConnection";
import { generateAccessToken, generateRefreshToken } from "./tokens";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { db } = await connectToDatabase();

  const req = await request.json();
  const { id, isPro } = req;
  let auth_time = new Date();
  const user = await db.collection("users").findOne({ id });

  let userFromDB;

  // Tokenları oluştur ve döndür
  const accessToken = await generateAccessToken(
    user ? user : { id, auth_time }
  );
  const refreshToken = await generateRefreshToken(
    user ? user : { id, auth_time }
  );

  if (user) {
    const updatedUser = await db
      .collection("users")
      .updateOne(
        { id },
        { $set: { accessToken, refreshToken, isPro } },
        { upsert: true, multi: false }
      );
  }
  // Yeni kullanıcı oluştur
  if (!user) {
    const customPayload = {
      ...req,
      isPro: false,
      accessToken,
      refreshToken,
    };
    const createdUser = await db
      .collection("users")
      .insertOne({ ...customPayload });
  }

  userFromDB = await db.collection("users").findOne({ id });

  return NextResponse.json({
    message: user ? "Giriş yapıldı." : "Kayıt yapıldı.",
    user: userFromDB,
    accessToken,
    refreshToken,
    isUserExist: user ? true : false,
  });
}
