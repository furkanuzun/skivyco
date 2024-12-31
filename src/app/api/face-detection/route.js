import axios from "axios";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const renderErrorMessage = (errorMessage) => {
  let userFriendlyMessage;

  if (errorMessage.includes("IMAGE_ERROR_UNSUPPORTED_FORMAT")) {
    userFriendlyMessage =
      "Yüklenen resim çözümleme için desteklenmeyen bir formatta veya dosya bozuk. Lütfen farklı bir dosya yükleyin.";
  } else if (errorMessage === "NO_FACE_FOUND") {
    userFriendlyMessage =
      "Resimde yüz tespit edilemedi. Lütfen yüz içeren bir resim yükleyin.";
  } else if (errorMessage === "INVALID_IMAGE_FACE") {
    userFriendlyMessage =
      "Yüklenen resim eksik veya birden fazla yüz içeriyor. Lütfen uygun bir resim yükleyin.";
  } else if (errorMessage.startsWith("INVALID_IMAGE_SIZE")) {
    userFriendlyMessage =
      "Yüklenen resim boyutu gereksinimleri karşılamıyor. Resim çok büyük veya çok küçük olabilir.";
  } else if (errorMessage === "INVALID_IMAGE_URL") {
    userFriendlyMessage =
      "Sağlanan resim URL'si hatalı veya geçersiz. Lütfen doğru bir URL sağlayın.";
  } else if (errorMessage.startsWith("IMAGE_FILE_TOO_LARGE")) {
    userFriendlyMessage =
      "Yüklenen resim dosyası çok büyük. Bu API, 2 MB'den daha büyük dosyaları kabul etmiyor.";
  } else if (errorMessage === "IMAGE_DOWNLOAD_TIMEOUT") {
    userFriendlyMessage =
      "Resim indirme işlemi zaman aşımına uğradı. Lütfen daha küçük bir dosya veya daha hızlı bir bağlantı kullanın.";
  } else {
    userFriendlyMessage = "Bilinmeyen bir hata oluştu. Lütfen tekrar deneyin.";
  }

  return userFriendlyMessage;
};

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

  let response;
  try {
    response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    const errorMessage = renderErrorMessage(error.response.data.error_message);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }

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

  return NextResponse.json({
    stauts: 200,
    data: response.data,
    openai: responseFromOpenAI,
  });
}

export async function GET(request) {
  return NextResponse.json({ message: "Hello from GET" });
}
