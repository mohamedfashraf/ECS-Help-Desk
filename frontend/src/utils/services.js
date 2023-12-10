export const baseUrl = "http://localhost:3000/api";

export const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

export const getRequest = async (url, token) => {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token in the request headers
        },
    });

    const data = await response.json();

    if (!response.ok) {
        let message = "an error occurred...";

        if (data?.message) {
            message = data.message;
        }
        return { error: true, message };
    }

    return data;
};
