/* eslint-disable node/prefer-global/process */
const isDev
  = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'

export default isDev
