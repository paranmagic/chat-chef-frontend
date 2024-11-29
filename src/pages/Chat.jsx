import React, { useCallback, useEffect, useState } from "react";
import MessageBox from "../components/MessageBox";
import PrevButton from "../components/PrevButton";
import { MoonLoader } from "react-spinners";

const Chat = ({ingredientList}) => {
  // useEffect의 용법 
  // 1. 컴포넌트 내에 있는 state값 변경시 호출
  // useEffect(() => {});
  // 2. 해당 컴포넌트 생성시 호출 (1번 만 실행)
  // useEffect(() => {}, []);
  // 3. value, message라는 state가 변경 될때만 호출
  // useEffect(() => {}, [value, message]);

  // TODO: set함수 추가하기
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]); // chatGPT와 사용자의 대화 메시지 배열
  const [isInfoLoading, setIsInfoLoading] = useState(true); // 최초 정보 요청시 로딩
  const [isMessageLoading, setIsMessageLoading] = useState(false); // 사용자와 메시지 주고 받을때 로딩
  const [infoMessages, setInfoMessages] = useState([]); // 초기세팅메세지

  const handleChange = (event) => {
    const { value } = event.target;
    console.log("value==>", value);
    setValue(value);
  };

  // logic
  const ENDPOINT = process.env.REACT_APP_SERVER_ADDRESS;

  // 최초정보 세팅
  const sendInfo = useCallback(async() => {
    setIsInfoLoading(true);
    console.log('REACT_APP_SERVER_ADDRESS: ', process.env.REACT_APP_SERVER_ADDRESS);
    try {
      const response = await fetch(`${ENDPOINT}/recipe`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({ingredientList})
      });

      const result = await response.json();
      console.log("🚀 ~ sendInfo ~ result:", result)

      // 최초 세팅 메세지 저장
      const removeLastDataList = result.data.filter((item) => item.role !== 'assistant');
      setInfoMessages(removeLastDataList);

      // messages의 배열을 변경
      const lastItem = result.data.find((item) => item.role === 'assistant');

      const {role, content} = lastItem;

      setMessages((prev) => [...prev, {
        role: role,
        content: content,
      }]);

      setIsInfoLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [ENDPOINT, ingredientList]);

  const sendMessage = useCallback(async(userMessage) => {
    setIsMessageLoading(true)

    try {
      const response = await fetch(`${ENDPOINT}/message`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({userMessage: userMessage, messages: [...infoMessages, ...messages]})
      });

      const result = await response.json();
      console.log("🚀 ~ sendInfo ~ result:", result)

      const {role, content} = result.data;

      setMessages((prev) => [...prev, {role, content}]);

      setIsMessageLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [ENDPOINT, infoMessages, messages]);  

  const handleSubmit = (event) => {
    event.preventDefault();
    const userMessage = {
      role: 'user',
      content: value.trim()
    }

    setMessages((prev) => [...prev, userMessage]);
    // TODO: API호출
    sendMessage(userMessage);
    setValue("");

    console.log("메시지 보내기");
  };

  useEffect(() => {
    // 최초 진입시 실행
    ingredientList.length && sendInfo();
  // eslint-disable-next-line
  },[sendInfo]);

  // view
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      {isInfoLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <MoonLoader color="#46A195" />
          </div>
        </div>
      )}

      {/* START: 로딩 스피너 */}
      {/* START:뒤로가기 버튼 */}
      <PrevButton />
      {/* END:뒤로가기 버튼 */}
      <div className="h-full flex flex-col">
        {/* START:헤더 영역 */}
        <div className="-mx-6 -mt-10 py-7 bg-chef-green-500">
          <span className="block text-xl text-center text-white">
            맛있는 쉐프
          </span>
        </div>
        {/* END:헤더 영역 */}
        {/* START:채팅 영역 */}
        <div className="overflow-auto">
          <MessageBox messages={messages} isLoading={isMessageLoading} />
        </div>
        {/* END:채팅 영역 */}
        {/* START:메시지 입력 영역 */}
        <div className="mt-auto flex py-5 -mx-2 border-t border-gray-100">
          <form
            id="sendForm"
            className="w-full px-2 h-full"
            onSubmit={handleSubmit}
          >
            <input
              className="w-full text-sm px-3 py-2 h-full block rounded-xl bg-gray-100 focus:"
              type="text"
              name="message"
              value={value}
              onChange={handleChange}
            />
          </form>
          <button
            type="submit"
            form="sendForm"
            className="w-10 min-w-10 h-10 inline-block rounded-full bg-chef-green-500 text-none px-2 bg-[url('../public/images/send.svg')] bg-no-repeat bg-center"
          >
            보내기
          </button>
        </div>
        {/* END:메시지 입력 영역 */}
      </div>
    </div>
  );
};

export default Chat;
