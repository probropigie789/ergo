import { createSupbaseAdmin } from "@/supabase/client";
import type { NextApiRequest, NextApiResponse } from "next";

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

// successfull result
/*
{
    "user": {
        "id": "7a3f3251-9b0e-4775-a265-71bfc6f25357",
        "aud": "authenticated",
        "role": "authenticated",
        "email": "mdmarufbinsalim@gmail.com",
        "email_confirmed_at": "2024-10-28T02:46:11.206747Z",
        "phone": "",
        "confirmed_at": "2024-10-28T02:46:11.206747Z",
        "last_sign_in_at": "2024-10-28T02:46:17.793662281Z",
        "app_metadata": {
            "provider": "email",
            "providers": [
                "email"
            ]
        },
        "user_metadata": {},
        "identities": [
            {
                "identity_id": "e5dbac02-5493-4475-9dd4-73865f5d8a15",
                "id": "7a3f3251-9b0e-4775-a265-71bfc6f25357",
                "user_id": "7a3f3251-9b0e-4775-a265-71bfc6f25357",
                "identity_data": {
                    "email": "mdmarufbinsalim@gmail.com",
                    "email_verified": false,
                    "phone_verified": false,
                    "sub": "7a3f3251-9b0e-4775-a265-71bfc6f25357"
                },
                "provider": "email",
                "last_sign_in_at": "2024-10-28T02:46:11.203258Z",
                "created_at": "2024-10-28T02:46:11.203311Z",
                "updated_at": "2024-10-28T02:46:11.203311Z",
                "email": "mdmarufbinsalim@gmail.com"
            }
        ],
        "created_at": "2024-10-28T02:46:11.200533Z",
        "updated_at": "2024-10-28T02:46:17.796097Z",
        "is_anonymous": false
    },
    "session": {
        "access_token": "eyJhbGciOiJIUzI1NiIsImtpZCI6IlpBV3NIejh2U2ttbjZieWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2VyY2xzZ2RscWVzbWZicHp5ZWVhLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI3YTNmMzI1MS05YjBlLTQ3NzUtYTI2NS03MWJmYzZmMjUzNTciLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzMwMDg3MTc3LCJpYXQiOjE3MzAwODM1NzcsImVtYWlsIjoibWRtYXJ1ZmJpbnNhbGltQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzMwMDgzNTc3fV0sInNlc3Npb25faWQiOiI0ZjMxOGEzMi1lMDFmLTQyZDItYmU3Ni00ZWQzOGQ1ZDlmNGEiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.0tdsJfyqUoQLoOkWD_ygyNUnep8qJlPFRXkpPEdw9AM",
        "token_type": "bearer",
        "expires_in": 3600,
        "expires_at": 1730087177,
        "refresh_token": "_KA9kRiUaghy2_Y5u54cwQ",
        "user": {
            "id": "7a3f3251-9b0e-4775-a265-71bfc6f25357",
            "aud": "authenticated",
            "role": "authenticated",
            "email": "mdmarufbinsalim@gmail.com",
            "email_confirmed_at": "2024-10-28T02:46:11.206747Z",
            "phone": "",
            "confirmed_at": "2024-10-28T02:46:11.206747Z",
            "last_sign_in_at": "2024-10-28T02:46:17.793662281Z",
            "app_metadata": {
                "provider": "email",
                "providers": [
                    "email"
                ]
            },
            "user_metadata": {},
            "identities": [
                {
                    "identity_id": "e5dbac02-5493-4475-9dd4-73865f5d8a15",
                    "id": "7a3f3251-9b0e-4775-a265-71bfc6f25357",
                    "user_id": "7a3f3251-9b0e-4775-a265-71bfc6f25357",
                    "identity_data": {
                        "email": "mdmarufbinsalim@gmail.com",
                        "email_verified": false,
                        "phone_verified": false,
                        "sub": "7a3f3251-9b0e-4775-a265-71bfc6f25357"
                    },
                    "provider": "email",
                    "last_sign_in_at": "2024-10-28T02:46:11.203258Z",
                    "created_at": "2024-10-28T02:46:11.203311Z",
                    "updated_at": "2024-10-28T02:46:11.203311Z",
                    "email": "mdmarufbinsalim@gmail.com"
                }
            ],
            "created_at": "2024-10-28T02:46:11.200533Z",
            "updated_at": "2024-10-28T02:46:17.796097Z",
            "is_anonymous": false
        }
    }
}

*/
