import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import KaKaoShare from "./KAKAOShareButton";

const Share = ({ inviteCode }) => {
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
      <KaKaoShare inviteCode={inviteCode} />
    </div>
  );
};

export default Share;
