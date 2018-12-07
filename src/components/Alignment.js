import React from 'react'
import { connect } from 'react-redux'

function Alignment ({lawfullness, goodness}) {
  const maxGood = 10, minGood = -10, maxLaw = 10, minLaw = -10,
    lawVals = ['Хаотичних', 'Нейтральних', 'Законослухняних'],
    goodVals = ['Злих', 'Нейтральних', 'Добрих']
  const lawVal = lawVals[
    Math.floor((lawfullness - minLaw) / (maxLaw - minLaw) * 3)
  ] || lawVals[2], // if lawfullness ==== 10 the index will be 3
  goodVal = goodVals[
    Math.floor((goodness - minGood) / (maxGood - minGood) * 3)
  ] || goodVals[2]
  let res
  if (lawVal === goodVal) {
      res = 'Цілком Нейтральних'
  } else {
    res = lawVal + ' ' + goodVal
  }
  return <span>{res}</span>
}


export default connect(
  state => ({
    lawfullness: state.lawfullness,
    goodness: state.goodness,
  })
)(Alignment)