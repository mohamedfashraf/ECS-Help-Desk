export const baseUrl = "https://ecs-project-backend.vercel.app";

export const postRequest = async (url, body) => {
  const token = localStorage.getItem("Token");
  const user = JSON.parse(localStorage.getItem("User"));

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let message;

    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }
    return { error: true, message };
  }

  return data;
};

export const getRequest = async (url) => {
  const token = localStorage.getItem("Token");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Handle non-2xx status codes
      const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch data");
    }

    // Check if the response has content
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response format");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
