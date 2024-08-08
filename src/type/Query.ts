// export default interface Category {
//   class?: string
//   where?: string
//   limit?: number
//   skip?: number
//   order?: string
//   include?: string
//   keys?: string
//   count?: number
// }

export default interface Query {
  class?: string
  where?: any
  limit?: number
  skip?: number
  order?: string
  include?: string
  keys?: string
  count?: number
}