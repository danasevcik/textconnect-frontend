import {
  SAY_HI
} from './types'

const sayHi = () => {
  return {type: SAY_HI, payload: "HI"}
}

export default {
  sayHi
}
