import { createSupbaseAdmin, createSupbaseClient } from "@/supabase/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

async function hashPassword(password: string) {
  const SALT_ROUNDS = 10; // You can adjust the salt rounds as needed
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;

  if (method !== "POST") {
    return res
      .status(405)
      .json({ message: `'${method}' Method Not Allowed - Use 'POST'` });
  }

  const email = req.body.email;
  const password = req.body.password;

  const name = req.body.name;
  const role = req.body.role;
  const subdomain = req.body.subdomain;
  const companyDetails = req.body.companyDetails;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (!name || !role || !subdomain || !companyDetails) {
    return res.status(400).json({
      message: "Name, Role, Subdomain and Company Details are required",
    });
  }

  if (role !== "admin" && role !== "compliance_manager" && role !== "user") {
    return res.status(400).json({
      message: "Role must be either admin, compliance_manager or user",
    });
  }

  const supabaseAdmin = await createSupbaseAdmin(); // for admin operations

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
  });

  if (error) {
    return res
      .status(400)
      .json({ message: `${error.code} : ${error.message}`, data: null });
  }

  if (!data) {
    return res.status(500).json({ message: "User not created", data: null });
  }

  const createdUser = data.user;
  const hashedPassword = await hashPassword(password);

  const userEntry = {
    id: createdUser.id,
    email: createdUser.email,
    hashed_password: hashedPassword,
    name: name,
    role: role,
    subdomain: subdomain,
    company_details: companyDetails,
  };

  // Add the user entry to the database
  const supabase = await createSupbaseClient(); // for user operations
  const { data: userEntryData, error: userEntryError } = await supabase
    .from("users")
    .insert([userEntry])
    .select("*")
    .single();

  console.log(userEntryData, userEntryError);

  if (userEntryError || !userEntryData) {
    // If there is an error creating the user entry, delete the user
    const { error: deleteUserError } =
      await supabaseAdmin.auth.admin.deleteUser(createdUser.id);

    return res.status(400).json({
      message: `Error creating user entry: ${userEntryError?.message}`,
      data: null,
    });
  }

  const finalData = {
    ...createdUser,
    ...userEntryData,
  };

  res.status(200).json({
    message: "User created successfully",
    data: finalData,
  });
}
