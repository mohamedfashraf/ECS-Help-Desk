import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipient] = useState(null);
    const [error, setError] = useState(null);

    const recipientId = chat?.members.find((id) => id !== user?._id);
    console.log("recipientId", recipientId);
    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) { return null };

            const response = await getRequest(`${baseUrl}/users/${recipientId}`);

            if (response.error) {
                return setError(error);
            };

            setRecipient(response);
        };
        getUser();
    }, []);
    return { recipientUser };
};