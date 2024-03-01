import styled from "styled-components";

const QuestionNum = styled.div`
  background-color: #37003c;
  width: fit-content;
  margin: 0 auto;
  color: #fff;
  text-transform: capitalize;
  padding: 7px 9px;
  border-radius: 50px;
`;
const StyleApp = styled.div`
  display: grid;
  grid-gap: 10px;
  color: #37003c;
  background-color: #ffff;
  padding: 15px;
  text-align: center;
  width: 80%;
  margin: 0 auto;

  @media (max-width: 390px) {
    font-size: 0.8rem;
  }
`;
const H1 = styled.h1`
  font-weight: 400;
  font-size: 1.4rem;

  @media (min-width: 768px) {
    width: 60%;
    margin: auto;
  }
`;
const Questions = styled.div`
  display: grid;
  grid-gap: 10px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const Wrapper = styled.div`
  border: 1px solid grey;
  padding: 4px;
  border-radius: 5px;
`;
const QuesDiv = styled.div`
  border: #8a7c9b 1px solid;
  border-radius: 5px;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  width: 100%;
  justify-content: start;
  padding: 10px;
  transition: all ease-out 1s;
  gap: 10px;

  &:hover {
    border: #87ceeb 1px solid;
    transition: all ease 1s;
  }
  &:hover div {
    transition: all ease 1s;
    background: linear-gradient(180deg, #87ceeb, #9e50ad);
  }
`;
const QuesOption = styled.div`
  background: linear-gradient(138deg, #ff2882, #963cff);
  font-weight: 500;
  color: #fff;
  padding: 5px 20px;
  font-size: 2.4rem;
  border-radius: 5px;
`;
const QuesH2 = styled.h2`
  font-weight: 400;
`;
const QuestionWrapper = styled.div`
  background-color: #963cff;
  height: 200px;
  display: grid;
  align-items: center;
  justify-content: center;
  border-radius: 200px/200px 0 0 0;
`;
const Icon = styled.span`
  width: 50px;
  margin: auto;
  padding: 10px;
  border-radius: 50%;
  font-size: 2rem;
  font-weight: 500;
  background-color: #fff;
`;

export default function QandA() {
  return (
    <StyleApp>
      <QuestionNum>question 1 of 10</QuestionNum>
      <QuestionWrapper>
        <Icon>?</Icon>
        <H1>
          who was the first player of the week in 2022/23, scoring the most
          points in gameweek 1
        </H1>
      </QuestionWrapper>
      <Questions>
        <Wrapper>
          <QuesDiv>
            <QuesOption>A</QuesOption>
            <QuesH2>Dejan kulusevski</QuesH2>
          </QuesDiv>
        </Wrapper>
        <Wrapper>
          <QuesDiv>
            <QuesOption>A</QuesOption>
            <QuesH2>Dejan kulusevski</QuesH2>
          </QuesDiv>
        </Wrapper>
        <Wrapper>
          <QuesDiv>
            <QuesOption>A</QuesOption>
            <QuesH2>Dejan kulusevski</QuesH2>
          </QuesDiv>
        </Wrapper>
        <Wrapper>
          <QuesDiv>
            <QuesOption>A</QuesOption>
            <QuesH2>Dejan kulusevski</QuesH2>
          </QuesDiv>
        </Wrapper>
      </Questions>
    </StyleApp>
  );
}
