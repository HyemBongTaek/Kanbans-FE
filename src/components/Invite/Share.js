import React, { useEffect } from "react";
import styles from "./style/_Share.module.scss";
import KaKaoShare from "./KAKAOShareButton";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  //배포전 임시 확인용
  const url = "https://www.naver.com/";
  return (
    <div className={styles.share_button}>
      <button className={styles.share_icon}>
        <KaKaoShare inviteCode={inviteCode} />
      </button>
      <FacebookShareButton
        className={styles.share_icon}
        url={url}
        quote={inviteCode}
      >
        <FacebookIcon />
      </FacebookShareButton>
      <TwitterShareButton
        className={styles.share_icon}
        url={url}
        title={`코코리에 초대합니다 ${inviteCode}`}
        via="함께하는 협업툴 코코리"
      >
        <TwitterIcon default={inviteCode} />
      </TwitterShareButton>
      <EmailShareButton url={url} className={styles.share_icon}>
        <EmailIcon default={inviteCode} />
      </EmailShareButton>
      <CopyToClipboard
        text={` ${url} / ${inviteCode}`}
        className={styles.share_icon}
      >
        <button>url, 초대코드 한번에 복사하기</button>
      </CopyToClipboard>
    </div>
  );
};

export default Share;
