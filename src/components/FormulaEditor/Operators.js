import { Square, SquareRootSvg } from '../MathComponents'

export default {
  plus: {math: '+', display: '+'},
  minus: {math: '-', display: '-'},
  multiply: {math: '*', display: '×'},
  divide: {math: '/', display: '÷'},
  // todo add start and end so this also works with
  // square of a square
  square: {math: '^2', display: '^2', component: Square},
  sqrt: {
    start: {math: 'sqrt(', display: 'sqrt(', component: SquareRootSvg},
    end: {math: ')', display: ')'}
  }
}
