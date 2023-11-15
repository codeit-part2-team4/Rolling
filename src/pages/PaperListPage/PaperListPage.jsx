import * as S from "./PaperListPage.style";
import { useState } from "react";
import { Link } from "react-router-dom";
import useRequest from "hooks/useRequest";
import PaperCard from "components/PaperCard";
import NavBar from "components/NavBar";
import { Button } from "components/Button";
import { Helmet } from "react-helmet";
import Loading from "assets/images/icons/loading.png";

function PaperListPage() {
  const { data: recentPaper } = useRequest({
    options: {
      url: "recipients/",
      method: "get",
    },
  });

  const { data: popularPaper } = useRequest({
    options: {
      url: "recipients/",
      method: "get",
      params: {
        sort: "like",
      },
    },
  });

  return (
    <>
      <Helmet>
        <title>롤링 페이퍼 목록 - Rolling</title>
        <meta
          name="description"
          content="누구나 손쉽게, 온라인 롤링 페이퍼를 만들 수 있어요!"
        />
        <meta
          property="og:image"
          content="https://codeit-part2-team4.github.io/assets/images/logo.png"
        />
        <meta property="og:title" content="롤링 페이퍼 목록 - Rolling" />
        <meta
          property="og:description"
          content="누구나 손쉽게, 온라인 롤링 페이퍼를 만들 수 있어요!"
        />
        <meta
          property="og:url"
          content="https://codeit-part2-team4.github.io/rolling/"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://codeit-part2-team4.github.io/assets/images/logo.png"
        />
        <meta name="twitter:title" content="롤링 페이퍼 목록 - Rolling" />
        <meta
          name="twitter:description"
          content="누구나 손쉽게, 온라인 롤링 페이퍼를 만들 수 있어요!"
        />
      </Helmet>
      <NavBar />
      <S.Container>
        <PaperSection title="인기 롤링 페이퍼 🔥" papers={popularPaper} />
        <PaperSection title="최근에 만든 롤링 페이퍼⭐️" papers={recentPaper} />
      </S.Container>
      <S.ButtonContainer>
        <Link to="/post">
          <S.StyledButton size="lg">나도 만들어보기</S.StyledButton>
        </Link>
      </S.ButtonContainer>
    </>
  );
}

function PaperSection({ title, papers }) {
  const [slideIndex, setSlideIndex] = useState(0);

  const slideLeft = () => {
    if (slideIndex <= 0) return;
    setSlideIndex((prev) => prev - 1);
  };
  const slideRight = () => {
    if (slideIndex - 1 >= papers?.results?.length - 4) return;
    setSlideIndex((prev) => prev + 1);
  };

  return (
    <S.Section>
      <S.Title>{title}</S.Title>
      <S.CardContainer>
        {papers ? (
          papers?.results?.map((paper) => (
            <Link key={paper?.id} to={`/post/${paper?.id}`}>
              <PaperCard data={paper} slideIndex={slideIndex} />
            </Link>
          ))
        ) : (
          <Fallback />
        )}
        {slideIndex > 0 && (
          <S.ArrowButtonContainer $left>
            <Button.Arrow type="button" left onClick={slideLeft} />
          </S.ArrowButtonContainer>
        )}
        {slideIndex < papers?.results?.length - 4 && (
          <S.ArrowButtonContainer $right>
            <Button.Arrow type="button" right onClick={slideRight} />
          </S.ArrowButtonContainer>
        )}
      </S.CardContainer>
    </S.Section>
  );
}

function Fallback() {
  return (
    <S.FallbackContainer>
      <S.Loading src={Loading} />
    </S.FallbackContainer>
  );
}

export default PaperListPage;
