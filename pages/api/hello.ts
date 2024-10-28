// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import supabase from "@/supabase/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { data, error } = await supabase.from("users").select("*");
  console.log(data, error);

  res.status(200).json({ name: "John Doe" });
}
