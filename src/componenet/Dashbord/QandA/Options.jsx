import { QuesDiv, QuesH2, QuesOption, Wrapper } from '../../../Ui/QandAstyle'

export default function Options({option,character}) {
  return (
    <Wrapper>
    <QuesDiv>
      <QuesOption>{character}</QuesOption>
      <QuesH2>{option}</QuesH2>
    </QuesDiv>
  </Wrapper>
  )
}
