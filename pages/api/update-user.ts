import { createSupbaseAdmin, createSupbaseClient } from "@/supabase/client";
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

  const user_id = req.body.user_id;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const update_value = req.body.update_value;

  if (!update_value) {
    return res.status(400).json({ message: "Update_value is required" });
  }

  const updated_object = {} as {
    name?: string;
    role?: string;
    subdomain?: string;
    company_details?: string;
  };

  if (update_value.name) {
    updated_object["name"] = update_value.name;
  }

  if (update_value.role) {
    updated_object["role"] = update_value.role;
  }

  if (update_value.subdomain) {
    updated_object["subdomain"] = update_value.subdomain;
  }

  if (update_value.company_details) {
    updated_object["company_details"] = update_value.company_details;
  }

  // if update_value.role is not null, check if it is a valid role

  if (update_value.role) {
    if (
      update_value.role !== "admin" &&
      update_value.role !== "compliance_manager" &&
      update_value.role !== "user"
    ) {
      return res.status(400).json({
        message: "Role must be either admin, compliance_manager or user",
      });
    }
  }

  const supabase = await createSupbaseClient();

  const { data, error } = await supabase
    .from("users")
    .update({
      ...updated_object,
    })
    .match({ id: user_id })
    .select("*")
    .single();

  if (error) {
    return res.status(400).json({
      message: `${error.code} : ${error.message}`,
      data: null,
    });
  }

  if (!data) {
    return res.status(500).json({ message: "User not updated", data: null });
  }

  return res.status(200).json({ message: "User updated!", data: data });
}
