import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "example4@gmail.com",
        password: "example-password",
        name: "Example User",
        role: "user",
        subdomain: "example-subdomain",
        companyDetails: "Example Company Details",
      }),
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setData({ error }));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>Home page content</p>
      {data && (
        <div>
          <h2>Data from API</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
