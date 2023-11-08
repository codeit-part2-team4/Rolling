import Relationship from "components/Badges/Relationship";
import * as S from "./Modal.style";
import PrimaryButton from "components/StyledButtons/PrimaryButton";

function Modal({ close, item, relationship, date }) {
  return (
    <>
      <S.ModalBackdrop onClick={close} />
      <S.ModalContainer>
        <S.ModalHeader>
          <S.ProfileWrapper>
            <S.ProfileImg src={item.profileImageURL}></S.ProfileImg>
            <S.ProfileInfo>
              <div>
                From. <S.Name>{item.sender}</S.Name>
              </div>
              <Relationship relationship={relationship} />
            </S.ProfileInfo>
          </S.ProfileWrapper>
          <S.ProfileDate>{date}</S.ProfileDate>
        </S.ModalHeader>
        <S.ModalContent>
          <S.ModalTextField font={item.font}>{item.content}</S.ModalTextField>
          <PrimaryButton
            onClick={close}
            width="12rem"
            margin="4rem auto 1rem"
            smallSize
          >
            확인
          </PrimaryButton>
        </S.ModalContent>
      </S.ModalContainer>
    </>
  );
}

export default Modal;
