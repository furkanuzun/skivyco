import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#000620]">
      <Image src="/icon.png" alt="Skivy Logo" width={200} height={200} />
      <div className="text-gray-100/90 text-sm font-thin">Cilt Bakımı & Yapay Zeka Analizi</div>
    </div>
  );
}
