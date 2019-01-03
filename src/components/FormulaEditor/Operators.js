import { Square, SquareRootSvg } from '../MathComponents'

export default {
  plus: {math: '+', display: '+'},
  minus: {math: '-', display: '-'},
  multiply: {math: '*', display: '×'},
  divide: {math: '/', display: '÷'},
  // todo add start and end so this also works with
  // square of a square
  square: {math: '^2', display: ' ', component: Square, clearLeft: true},
  sqrt: {
    start: {math: 'sqrt(', display: ' ', component: SquareRootSvg, clearRight: true},
    end: {math: ')', display: '', clearLeft: true}
  }
}
