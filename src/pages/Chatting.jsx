import styled from "styled-components";
import { StContainer } from "../UI/common";
import { AiOutlineArrowUp } from "react-icons/ai";
import Button from "../components/common/Button";
import NavigateBtn from "../components/common/NavigateBtn";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useRef } from "react";
import { useSelector } from "react-redux";
import BeforChat from "./BeforChat";

const Chatting = () => {
  const socket = useRef(null);
  const { diaryId, userId } = useSelector((state) => state.chatSlice);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const socketData = { message, diaryId, userId };
  const [btnColor, setBtnColor] = useState("button_icon");

  const messageOnChangeHandle = (event) => {
    let txt = event.target.value;
    if (txt.length === 0) {
      setBtnColor("button_icon");
    } else {
      setBtnColor("button_primary");
    }
    setMessage(txt);
  };
  const messageSendOnclick = () => {
    console.log(socketData);
    setMessage("txt");
    socket.current.emit("chat_message", socketData);
  };

  useEffect(() => {
    socket.current = io.connect("https://mylee.site");
    return () => {
      socket.current.disconnect();
    };
  }, []);
  useEffect(() => {
    socket.current._callbacks = {};
    socket.current.on("receiveMessage", (message) => {
      console.log(socket);
      console.log(message);
      setMessageList((prev) => [...prev, message]);
    });
  }, [socket.current]);
  return (
    <StContainer bgColor="#F8F8F8">
      <ChatHeader>
        <div>
          <NavigateBtn prev link={"/chatlist"} sizeType="header" />
        </div>
      </ChatHeader>
      <BeforChat diaryId={diaryId} userId={userId}></BeforChat>
      <ChatFooter>
        <div>
          <input
            value={message}
            onChange={messageOnChangeHandle}
            placeholder="채팅입력.."
          />
        </div>
        <div onClick={messageSendOnclick}>
          <Button
            size="mini"
            color={btnColor}
            icon={<AiOutlineArrowUp />}
            round
          />
        </div>
      </ChatFooter>
    </StContainer>
  );
};
export default Chatting;
const ChatHeader = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 7.2rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border-radius: 20px 20px 0px 0px;
  & div {
    left: 1rem;
    position: absolute;
  }
  & div:last-child {
    left: 5rem;
    position: absolute;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 1.7rem;
    color: #242424;
  }
`;

const ChatBubble = styled.div`
  display: flex;
  padding: ${(props) => props.padding};
`;
const SpeeckPoint = styled.div`
  border-top: ${(props) => props.borderTop};
  border-right: ${(props) => props.borderRight};
  border-left: ${(props) => props.borderLeft};
`;
const ChatFooter = styled.div`
  position: absolute;
  bottom: 0rem;
  left: 0rem;
  width: 100%;
  height: 7.2rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border-radius: 20px 20px 0px 0px;
  & input {
    background: #fafafa;
    width: 28.4rem;
    height: 3.7rem;
    border: 1px solid #e8e8e8;
    border-radius: 3.3rem;
    padding: 1rem;
  }
`;

// const ChatImg = styled.img`
//   width: 50px;
//   height: 50px;
//   position: absolute;
// `;
const ChatUser = styled.div`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  padding: ${(props) => props.padding};
`;
const ChatTime = styled.div`
  font-size: 0.1rem;
`;
const ChatWrapper = styled.div`
  display: "flex";
`;
