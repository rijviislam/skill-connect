"use client";
import Loading from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { createContext } from "react";
export const CardContext = createContext(null);
export default function ServicesContext({ children }) {
  const { data: session } = useSession();

  const userEmail = session?.user?.email;
  const {
    data: services = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["services", userEmail],
    queryFn: async () => {
      const result = await fetch(
        `/api/my-services-get?email=${encodeURIComponent(userEmail)}`
      );

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await result.json();

      if (!data) {
        throw new Error("No data returned");
      }

      return data;
    },
  });

  if (isLoading) return <h1><Loading/></h1>;
  if (isError) return <h1>Error ...</h1>;
  //   console.log(services);
  const val = {
    services,
    refetch,
    isLoading,
    isError,
  };
  return (
    <div>
      <CardContext.Provider value={val}>{children}</CardContext.Provider>
    </div>
  );
}
