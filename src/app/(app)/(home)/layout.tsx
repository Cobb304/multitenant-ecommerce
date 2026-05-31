import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Category } from "@/payload-types";

import Footer from "./Footer";
import Navbar from "./Navbar";
import SearchFilters from "./search-filters/index";
import { CustomCategory } from "./types";

interface Props {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: Props) {
  const payload = await getPayload({
    config: configPromise,
  });
  const data = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: "name",
  });
  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs || []).map((doc) => ({
      ...(doc as Category),
      subcategories: undefined,
    })),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
}
