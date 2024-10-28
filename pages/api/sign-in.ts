import { createSupbaseAdmin } from "@/supabase/client";
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

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const supabaseAdmin = await createSupbaseAdmin(); // for admin operations

  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    return res
      .status(400)
      .json({ message: `${error.code} : ${error.message}`, data: null });
  }

  res.status(200).json({
    message: "Sign in successful",
    data: data,
  });
}
