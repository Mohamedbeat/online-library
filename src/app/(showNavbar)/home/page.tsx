import Image from "next/image";
import MyComponent from "../../MyComponent";
import { getSession } from "@/utils/Lib";
import Section from "@/components/Section";
import PopularCategories from "../categories/PopularCategories";
import LatestArticles from "./LatestArticles";
export default async function Home() {
  const session = await getSession();
  // console.log(session.payload.name);

  return (
    <div className="">
      {/* <p>{JSON.stringify(session)}</p> */}
      {/* <MyComponent /> */}
      <Section title="See our popular topics">
        <PopularCategories />
      </Section>

      <Section title="Browse latest articles">
        <LatestArticles />
      </Section>
    </div>
  );
}
