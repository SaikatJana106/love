"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      router.push("/love");
    }
  }, [router]);

  const handleSubmit = () => {
    if (name.trim() !== "") {
      localStorage.setItem("username", name);
      router.push("/love");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Enter Your Name</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border border-gray-400 rounded"
        placeholder="Your Name"
      />
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </div>
  );
}
