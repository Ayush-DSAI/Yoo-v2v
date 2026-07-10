"use client";

import { analyzeRoute } from "@/services/api/routes";
import axios from "axios";

export default function TestPage() {
  async function testAPI() {
    try {
      const data = await analyzeRoute();

      console.log("SUCCESS:", data);
      alert("Success");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("ERROR OBJECT:", err);

        if (err.response) {
          console.log("Status:", err.response.status);
          console.log("Response:", err.response.data);
        } else if (err.request) {
          console.log("No response received:", err.request);
        } else {
          console.log("Message:", err.message);
        }
      } else {
        console.error("Unexpected error:", err);
      }
    }
  }

  return (
    <div className="p-10">
      <button
        onClick={testAPI}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Test AI Route
      </button>
    </div>
  );
}
