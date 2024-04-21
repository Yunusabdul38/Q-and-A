import styled from "styled-components";

const QuestionNum = styled.div`
  background: linear-gradient(138deg, #ff2882, #963cff);
  width: fit-content;
  margin: 0 auto;
  color: #fff;
  text-transform: capitalize;
  padding: 7px 9px;
  border-radius: 50px;
`;
const StyleApp = styled.div`
  font-family: "Lexend Deca", sans-serif;
  display: grid;
  grid-gap: 10px;
  color: #37003c;
  /* background-color: #ffff; */
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
  color: white;
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
const Wrapper = styled.button`
  border: 1px solid #ecf4d6;
  padding: 4px;
  cursor: pointer;
  border-radius: 5px;
  &:disabled{
    cursor: not-allowed;
  }
`;
const QuesDiv = styled.div`
  border: #ecf4d6 2px solid;
  border-radius: 5px;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  width: 100%;
  justify-content: start;
  padding: 10px;
  transition: all ease-out 1s;
  gap: 10px;
  background-color: ${props=> props.answer?"#1d267d":"none"};
  &:hover {
    border: #87ceeb 2px solid;
    transition: all linear 250ms;
    background-color: #1d267d;
  }
  &:hover div {
    transition: all ease 1s;
    background: linear-gradient(180deg, #87ceeb, #9e50ad);
  }
  & div {
    background: ${props=> props.answer?"linear-gradient(180deg, #87ceeb, #9e50ad)":"linear-gradient(138deg, #ff2882, #963cff)"}; 
  }
`;
const QuesOption = styled.div`
  background: linear-gradient(138deg, #ff2882, #963cff);
  font-weight: 500;
  color: #fff;
  padding: 5px 20px;
  font-size: 2.4rem;
  border-radius: 5px;
  text-transform: uppercase;
`;
const QuesH2 = styled.h2`
  font-weight: 400;
  color: #ecf4d6;
`;
const QuestionWrapper = styled.div`
  background-color: #1d267d;
  height: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
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
export {H1,Icon,QuesDiv,QuesH2,QuesOption,QuestionNum,QuestionWrapper,Questions,StyleApp,Wrapper}