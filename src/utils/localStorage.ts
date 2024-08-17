export const keys = {
  KEY_TOKEN: 'token',
  KEY_CURRENT_USER: 'current_user',
}

export function set(key: string, data: string) {
  localStorage.setItem(key, data)
}

export function get(key: string): string | null {
  return localStorage.getItem(key)
}

// export function getUser(): AVUser | undefined {
//   const userString = localStorage.getItem(keys.KEY_CURRENT_USER)
//   if (userString) {
//     return JSON.parse(userString)
//   }
//   return undefined
// }

// export function setUser(user: AVUser) {
//   localStorage.setItem(keys.KEY_CURRENT_USER, JSON.stringify(user))
// }
