import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import KaKaoShare from "./KAKAOShareButton";

const Share = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <KaKaoShare />
    </div>
  );
};

export default Share;
