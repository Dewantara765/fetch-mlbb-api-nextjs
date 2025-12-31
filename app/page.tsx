
import Image from "next/image";
import Link from "next/link";
import api from "@/services/api";

async function fetchHeroList()  {
 const res = await api.get("/hero-list/");
  return res.data.data.records;
}

interface HeroListData {
  data: {
    hero_id: number;
    hero: {
      data: {
        name: string;
        head: string;
      };
    };
  };
}

export default async function Home() {
  const heroes : HeroListData[] = await fetchHeroList();

  return (
    <main>
      <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>
      <div className="flex gap-20 flex-wrap px-8 pt-8">
        {heroes.map((hero) => (
          <div key={hero.data.hero_id} className="mb-4 shadow-xl p-4">
            <Link href={`/hero/${hero.data.hero_id}`}>
            <Image src={hero.data.hero.data.head} alt={hero.data.hero.data.name} width={100} height={100} unoptimized/>
            <div className="text-center">{hero.data.hero.data.name}</div>
          </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
