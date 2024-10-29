import { createSupbaseClient } from "@/supabase/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;

  if (method === "OPTIONS") {
    return res.status(200).send("ok");
  }

  if (method !== "POST") {
    return res
      .status(405)
      .json({ message: `'${method}' Method Not Allowed - Use 'POST'` });
  }

  if (!req.body) {
    return res.status(400).json({
      error: "Missing request body",
      data: null,
    });
  }

  const paginated = req.body.paginated;
  const isPaginated = paginated ? paginated === true : false;
  const page = req.body.page ? parseInt(req.body.page) : 1;
  const items_per_page = req.body.items_per_page
    ? parseInt(req.body.items_per_page)
    : 10;

  const supabase = await createSupbaseClient();

  if (isPaginated) {
    const { count, error: countError } = await supabase
      .from("users")
      .select("id", { count: "exact", head: true });

    if (countError || !count) {
      return res.status(400).json({ message: countError });
    }

    const max_pages = Math.ceil(count / items_per_page);

    if (page > max_pages) {
      return res.status(400).json({
        message: `Page ${page} does not exist. Max pages: ${max_pages}`,
      });
    }

    let start = (page - 1) * items_per_page;
    let end = start + items_per_page - 1;

    console.log("start", start);
    console.log("end", end);

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .range(start, end);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json({
      message: "fetched user data!",
      data: {
        users: data,
        page: page,
        items_per_page: items_per_page,
        max_pages: max_pages,
      },
    });
  }

  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return res.status(200).json({
    message: "fetched user data!",
    data: {
      users: data,
    },
  });
}
