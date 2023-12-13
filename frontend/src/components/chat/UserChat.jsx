import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers } = useContext(ChatContext);

  const isOnline = onlineUsers.some(
    (user) => user?.userId === recipientUser?._id
  );

  return (
    <>
      <Stack
        direction="horizontal"
        gap={3}
        className="user-card align-items-center p-2 justify-content-between"
        role="button"
      >
        <div className="d-flex">
          <div className="me-2">
            <img src={avatar} height="45px" />
          </div>
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">Text message</div>
        </div>
        <div className="d-flex flex-column align-items-end">
          <div className="date">12/12/2023</div>
          <div className="this-user-notifications">2</div>
          <span className={isOnline ? "user-online" : "user-offline"}></span>
        </div>
      </Stack>
    </>
  );
};

export default UserChat;
