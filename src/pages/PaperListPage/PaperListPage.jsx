import * as S from "./PaperListPage.style";
import { useState } from "react";
import { Link } from "react-router-dom";
import useRequest from "hooks/useRequest";
import PaperCard from "components/PaperCard";
import NavBar from "components/NavBar";
import PrimaryButton from "components/StyledButtons/PrimaryButton";
import ArrowButton from "components/StyledButtons/ArrowButton";

function PaperListPage() {
  const { data: recentPaper } = useRequest({
    url: "recipients/",
    method: "get",
  });

  const { data: popularPaper } = useRequest({
    url: "recipients/",
    method: "get",
    params: {
      sort: "like",
    },
  });

  const popularPaperResults = popularPaper?.results;

  const reversedPopularPaper = {
    ...popularPaper,
    results: popularPaperResults && [...popularPaperResults]?.reverse(),
  };

  return (
    <>
      <NavBar />
      <S.Container>
        <PaperSection
          title="인기 롤링 페이퍼 🔥"
          papers={reversedPopularPaper}
        />
        <PaperSection title="최근에 만든 롤링 페이퍼⭐️" papers={recentPaper} />
      </S.Container>
      <S.ButtonContainer>
        <Link to="/post">
          <PrimaryButton smallSize>나도 만들어보기</PrimaryButton>
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
    if (slideIndex - 1 >= papers?.count - 4) return;
    setSlideIndex((prev) => prev + 1);
  };

  return (
    <S.Section>
      <S.Title>{title}</S.Title>
      <S.CardContainer>
        {papers &&
          papers?.results?.map((paper) => (
            <li key={paper?.id}>
              <PaperCard data={paper} slideIndex={slideIndex} />
            </li>
          ))}
        {slideIndex > 0 && (
          <S.ArrowButtonContainer $left>
            <ArrowButton type="button" left onClick={slideLeft} />
          </S.ArrowButtonContainer>
        )}
        {slideIndex < papers?.count - 4 && (
          <S.ArrowButtonContainer $right>
            <ArrowButton type="button" right onClick={slideRight} />
          </S.ArrowButtonContainer>
        )}
      </S.CardContainer>
    </S.Section>
  );
}

export default PaperListPage;
