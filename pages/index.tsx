import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>Home page content</p>
    </div>
  );
}
