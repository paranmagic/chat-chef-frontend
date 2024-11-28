import React from "react";
import Button from "../components/Button";
import Title from "../components/Title";

const Home = () => {
  // logic

  const handleStart = () => {
    console.log("info페이지로 이동");
  };

  // view
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      <i className="w-168 h-168 rounded-full bg-chef-green-500 fixed -z-10 -left-60 -top-96"></i>
      <div className="fixed left-0 top-1/2 transform -translate-y-1/3 -z-10">
        <img src="./images/hero.svg" alt="hero" />
      </div>
      <div className="h-full flex flex-col">
        <Title mainMsg="맛있는 쉐프" subMsg="냉장고에 있는 재료로 요리를 열심해 해 봅시다." />
        <Button
          text="Get started"
          color="bg-chef-green-500"
          onClick={handleStart}
        />
      </div>
    </div>
  );
};

export default Home;
