import React, { useEffect } from "react";

const KAKAOShareButton = () => {
  useEffect(() => {
    initKakao();
  }, []);

  const initKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        const KakaoKey = process.env.REACT_APP_KAKAO_SHARE_KEY;
        kakao.init(KakaoKey);
      }
    }
  };
  const shareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "Cocori 칸반보드",
        description: "협업사이트 Cocori",
        imageUrl:
          "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbzGQZp%2FbtrDThRmiDj%2FnCkeIKWiIdQqJ4nY8ziQ0k%2Fimg.png",
        link: {
          webUrl: "http://localhost:3000/",
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            webUrl: "http://localhost:3000/",
          },
        },
      ],
    });
  };

  return (
    <>
      <div className="kakao_share" onClick={shareKakao}>
        <img
          src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
          alt="카카오톡 공유 보내기 버튼"
        />
      </div>
    </>
  );
};

export default KAKAOShareButton;
