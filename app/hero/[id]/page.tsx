
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import api from "@/services/api";
async function fetchHero(id: number){
  try {
 const res = await api.get(`/hero-detail/${id}/`);
  return res.data.data.records;
 } catch (error : unknown) {
    notFound();
 }
}

export async function generateMetadata({params}: {params: {id: number}}): Promise<Metadata> {
  const {id} = await params;
  const hero : HeroData[] = await fetchHero(id);
  return {
    title: `${hero[0].data.hero.data.name} Details`,
    description: `Details and abilities of ${hero[0].data.hero.data.name}`,
}
}
interface HeroData {
  data: {
    hero: {
      data: {
        name: string;
        head: string;
        painting: string;
        smallmap: string;
        sortlabel: string[];
        speciality: string[];
        roadsort: {
          data: {
            road_sort_title: string;
            road_sort_icon: string;
          };
        }[];
        heroskilllist: {
          skilllist: {
            skillid: number;
            skillname: string;
            skillicon: string;
            "skillcd&cost": string;
            skilldesc: string;
          }[];
        }[];
      };
    };
    relation: {
      assist: {
        desc: string;
        target_hero: {
          data: {
            head: string;
          };
        }[];
      };
      strong: {
        desc: string;
        target_hero: {
          data: {
            head: string;
          };
        }[];
      };
      weak: {
        desc: string;
        target_hero: {
          data: {
            head: string;
          };
        }[];
      };
    };
  };
  // Add more properties as needed
}
export default async function HeroPage({params}: {params: {id: number}}) {
  const {id} = await params;
  const hero : HeroData[] = await fetchHero(id);


  return (
    <main>
      <h1 className="text-3xl font-bold underline">Hero Page</h1>
      <p>Hero ID: {id}</p>
      <div className="p-12">
        
           <div className="mb-4 shadow-xl p-8">
            <div className="flex gap-4 justify-center mb-4">
              {hero[0].data.hero.data.painting && <Image src={hero[0].data.hero.data.painting} alt={hero[0].data.hero.data.name} width={300} height={300} unoptimized/>}
              <Image src={hero[0].data.hero.data.smallmap} alt={hero[0].data.hero.data.name} width={200} height={300} unoptimized/>
            </div>
            <div className="flex gap-4 items-center mb-4">
              <Image src={hero[0].data.hero.data.head} alt={hero[0].data.hero.data.name} width={100} height={100} unoptimized/>
              <div className="font-bold text-3xl">{hero[0].data.hero.data.name}</div>
            </div>
            <div><b>Role:</b> {hero[0].data.hero.data.sortlabel.join(", ")}</div>
            <div><b>Speciality:</b> {hero[0].data.hero.data.speciality.join(", ")}</div>
            <div><b>Lane:</b> 
            <span className="flex gap-0.5">
              {hero[0].data.hero.data.roadsort[0].data.road_sort_title}
              <Image src={hero[0].data.hero.data.roadsort[0].data.road_sort_icon} alt={hero[0].data.hero.data.roadsort[0].data.road_sort_title} width={30} height={30} unoptimized/>
            </span>
            </div>
            <div><b>Abilities:</b> 
              <div className="flex flex-col gap-3">
                {hero[0].data.hero.data.heroskilllist[0].skilllist.map((ability: any) => (
                  <div className="bg-gray-800 text-white p-4" key={ability.skillid}>
                    <div><b>{ability.skillname}</b></div>
                    <Image src={ability.skillicon} alt={ability.skillname} width={50} height={50} unoptimized/>
                    <div>{ability["skillcd&cost"]}</div>
                    <div dangerouslySetInnerHTML={{__html: ability.skilldesc}}></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3"><b>Relations:</b>
              <div><b>Assist :</b> 
                <br/>
                {hero[0].data.relation.assist.desc}
                <div className="flex gap-2">
                  <Image src={hero[0].data.relation.assist.target_hero[0].data.head} alt="hero 1" width={50} height={50} unoptimized/>
                  <Image src={hero[0].data.relation.assist.target_hero[1].data.head} alt="hero 2" width={50} height={50} unoptimized/>
                  {hero[0].data.relation.assist.target_hero[2] ? <Image src={hero[0].data.relation.assist.target_hero[2].data.head} alt="hero 3" width={50} height={50} unoptimized/> : null}
                </div>
              </div>
              <div><b>Strong :</b> 
                <br/>
                {hero[0].data.relation.strong.desc}
                <div className="flex gap-2">
                  <Image src={hero[0].data.relation.strong.target_hero[0].data.head} alt="hero 1" width={50} height={50} unoptimized/>
                  <Image src={hero[0].data.relation.strong.target_hero[1].data.head} alt="hero 2" width={50} height={50} unoptimized/>
                  {hero[0].data.relation.strong.target_hero[2] ? <Image src={hero[0].data.relation.strong.target_hero[2].data.head} alt="hero 3" width={50} height={50} unoptimized/> : null}
                </div>
              </div>
              <div><b>Weak :</b> 
              <br/>
                {hero[0].data.relation.weak.desc}
                <div className="flex gap-2">
                  <Image src={hero[0].data.relation.weak.target_hero[0].data.head} alt="hero 1" width={50} height={50} unoptimized/>
                   {hero[0].data.relation.weak.target_hero[1] ? <Image src={hero[0].data.relation.weak.target_hero[1].data.head} alt="hero 2" width={50} height={50} unoptimized/> : null}
                  {hero[0].data.relation.weak.target_hero[2] ? <Image src={hero[0].data.relation.weak.target_hero[2].data.head} alt="hero 3" width={50} height={50} unoptimized/> : null}
                </div>
              </div>
            </div>

          </div>
        
      </div>
    </main>
  );
}