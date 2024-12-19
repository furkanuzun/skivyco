import axios from "axios";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export async function POST(request) {
  // gelen data json, içerisinden image al
  const res = await request.json();
  const { image } = res;

  const API_KEY = "pfgdSTyiz2pktFQH-UqgDp7u3ymjWaqW"; // Face++ API key
  const API_SECRET = "9x359HChLfSbE-_ElQpSTD-jPQn2ZjsF"; // Face++ API secret
  const API_URL = "https://api-us.faceplusplus.com/facepp/v1/skinanalyze";

  const formData = new FormData();
  formData.append("api_key", API_KEY);
  formData.append("api_secret", API_SECRET);
  formData.append("image_url", image);

  const response = await axios
    .post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => console.log("res", res))
    .catch((err) => {
      console.log("face++ err", err.response.data);
      console.log("face++ msg", err?.message);
      console.log("face++ datamsg", err?.response?.data?.message);
    });

  const responseFromOpenAI = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `
            Bir dermatolog yapay zekâsısınız. Sağlanan yüz verilerine dayalı olarak olası cilt sorunlarını tespit edin ve bir cilt bakım rutini önerin.
            Verdiğim verideki skin_type alanının karşılıkları şunlar; 0 = oily skin, 1 = dry skin, 2 = normal skin, 3 = mixed skin. Bu veriye göre cilt tipini belirle ve issues içerisinde kullan.
            Vereceğimiz issues alanının sonuna oluşturduğumuz rutinin çok işe yarayacağını ve kullanıcının cilt sorunlarını çözeceğini belirt.
            Cilt bakım rutini önerirken her öneriye Türkiye'de erişilebilir 3 tane ucuz, 3 tane orta segment, 3 tane pahalı ürün öner.
            Her routine item'ı için önereceğin ürünler "recommendations" arrayi içerisinde "ucuz", "orta", "pahali" keyleri içerisinde array olarak key olmadan string olarak dön.
            Her routine item'ı için kullanıcılara gösterilecek bir başlık ve kısa bir açıklama ver. Başlığı "title" ve açıklamayı "description" olarak dön.
            Cevabı Türkçe ver. issues alanında cilt sorunlarını detaylı olarak açıkla ve string olarak dön.
            Açıklarken bir dermatolog gibi değil, sıradan bir insanın anlayacağı şekilde anlat ve sana ilettiğim verileri gösterme.
            Biraz daha samimi ve kullanıcıyı iyi hissettirecek şekilde yaz.
            Rutinin nasıl uygulanması gerektiğiyle alakalı detaylı bilgileri routine_instructions altında madde madde dön.
            Veri: ${JSON.stringify(
              response.data.result
            )} Yanıtı JSON formatında döndüren bir cevap verin:
            {
              "issues": string, 
              "routine": [...],
              "routine_instructions": [...]
            }
          `,
      },
    ],
  });

  console.log(
    "--responseFromOpenAI",
    responseFromOpenAI.choices[0].message.content
  );
  //   res.status(200).json(response.data.choices[0].message.content);

  // return response data to json

  return NextResponse.json({
    stauts: 200,
    data: response.data,
    openai: responseFromOpenAI,
  });
}

export async function GET(request) {
  return NextResponse.json({ message: "Hello from GET" });
}
