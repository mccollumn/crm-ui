import { cache } from "react";
import "server-only";

export const preload = (id: string) => {
  void getData(id);
};

export const getData = cache(async (id: string) => {
  try {
    console.log("Fetching data...");
    const res = await fetch("https://dev.to/api/articles");

    if (!res.ok) {
      throw new Error("Network response was not OK");
    }

    const result = await res.json();
    console.log("Get result:", result);
    return result;
  } catch (error) {
    console.error("GET failed:", error);
  }
});

export const postData = cache(async (data: any) => {
  try {
    console.log("Posting data...");
    const res = await fetch("https://dev.to/api/articles", {
      method: "POST", // Or PUT?
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Network response was not OK");
    }

    const result = await res.json();
    console.log("POST result:", result);
    return res.json();
  } catch (error) {
    console.error("POST failed:", error);
  }
});
