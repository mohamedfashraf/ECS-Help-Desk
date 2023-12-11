import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipient] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Chat in useFetchRecipientUser:", chat);
        console.log("User in useFetchRecipientUser:", user);

        if (!chat || !chat.members || !user?._id) {
            setLoading(false);
            return;
        }

        const recipientId = chat.members.find((id) => id !== user._id);

        console.log("TOP G", recipientId);

        if (!recipientId) {
            setLoading(false);
            return;
        }

        async function getUser() {
            try {
                const response = await getRequest(`${baseUrl}/users/${recipientId}`);
                console.log("Recipient User - Users response:", response);

                if (response.error) {
                    setError(response.error);
                } else {
                    // Create a copy of the response to avoid potential reference issues
                    const recipientUserCopy = { ...response };
                    setRecipient(recipientUserCopy);
                }
            } catch (error) {
                setError("An error occurred while fetching the recipient user");
            } finally {
                setLoading(false);
            }
        }

        getUser();
    }, [chat, user]);

    return { recipientUser, loading, error };

};
