import Link from "next/link";


export default function Home() {
  return(
    <div className="flex flex-col gap-3 text-center">
      <h1 className="text-2xl">Bienvenidos a Ricchi Diary</h1>
      <p className="text-gray-700">Con ricchi diary podras llevar un record de todas tus actividades, tenienendo la posibiidad de separar tus diarios en distintas categorias personalizables para mayor organizacion</p>
      <Link href={"/dashboard"}><button className="bg-blue-900 text-lg font-medium text-white px-10 py-2 rounded" >Iniciar</button></Link>
    </div>

  );
}
