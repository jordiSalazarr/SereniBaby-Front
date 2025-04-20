// Types for our data model
export type Child = {
  id: string
  name: string
  birthdate: string
}

export type User = {
  id: string
  email: string
  password: string // In a real app, this would be hashed
  createdAt: string
  children: Child[]
}

export type SleepLog = {
  id: string
  userId: string
  date: string
  sleepTime: string
  wakeTime: string
  wakeups: number
  notes: string
  isSleepHour:boolean
  createdAt: string
}

export type Nap = {
  id: string
  userId: string
  date: string
  startTime: string
  endTime: string
  notes: string
  createdAt: string
}

// Helper functions for local storage
const USERS_KEY = "sweetdreams_users"
const CURRENT_USER_KEY = "sweetdreams_current_user"
const SLEEP_LOGS_KEY = "sweetdreams_sleep_logs"
const NAPS_KEY = "sweetdreams_naps"

// User management
export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY)
  return users ? JSON.parse(users) : []
}

export const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY)
  return user ? JSON.parse(user) : null
}

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

export const registerUser = (email: string, password: string): User => {
  const users = getUsers()

  // Check if user already exists
  if (users.some((user) => user.email === email)) {
    throw new Error("User already exists")
  }

  const newUser: User = {
    id: Date.now().toString(),
    email,
    password, // In a real app, this would be hashed
    createdAt: new Date().toISOString(),
    children: [],
  }

  users.push(newUser)
  saveUsers(users)
  setCurrentUser(newUser)

  return newUser
}

export const loginUser = (email: string, password: string): User => {
  const users = getUsers()
  const user = users.find((user) => user.email === email && user.password === password)

  if (!user) {
    throw new Error("Invalid credentials")
  }

  setCurrentUser(user)
  return user
}

export const logoutUser = () => {
  setCurrentUser(null)
}

export const updateUser = (updatedUser: User) => {
  const users = getUsers()
  const index = users.findIndex((user) => user.id === updatedUser.id)

  if (index !== -1) {
    users[index] = updatedUser
    saveUsers(users)
    setCurrentUser(updatedUser)
  }
}

// Sleep logs management
export const getSleepLogs = (userId: string): SleepLog[] => {
  const logs = localStorage.getItem(SLEEP_LOGS_KEY)
  const allLogs = logs ? JSON.parse(logs) : []
  return allLogs.filter((log: SleepLog) => log.userId === userId)
}

export const saveSleepLog = (log: Omit<SleepLog, "id" | "createdAt">) => {
  const logs = localStorage.getItem(SLEEP_LOGS_KEY)
  const allLogs = logs ? JSON.parse(logs) : []

  const newLog: SleepLog = {
    ...log,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }

  allLogs.push(newLog)
  localStorage.setItem(SLEEP_LOGS_KEY, JSON.stringify(allLogs))

  return newLog
}

// Naps management
export const getNaps = (userId: string): Nap[] => {
  const naps = localStorage.getItem(NAPS_KEY)
  const allNaps = naps ? JSON.parse(naps) : []
  return allNaps.filter((nap: Nap) => nap.userId === userId)
}

export const saveNap = (nap: Omit<Nap, "id" | "createdAt">) => {
  const naps = localStorage.getItem(NAPS_KEY)
  const allNaps = naps ? JSON.parse(naps) : []

  const newNap: Nap = {
    ...nap,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }

  allNaps.push(newNap)
  localStorage.setItem(NAPS_KEY, JSON.stringify(allNaps))

  return newNap
}

export const deleteSleepLog = (id: string) => {
  const logs = localStorage.getItem(SLEEP_LOGS_KEY)
  if (!logs) return

  const allLogs: SleepLog[] = JSON.parse(logs)
  const updatedLogs = allLogs.filter((log) => log.id !== id)

  localStorage.setItem(SLEEP_LOGS_KEY, JSON.stringify(updatedLogs))
}

export const deleteNap = (id: string) => {
  const naps = localStorage.getItem(NAPS_KEY)
  if (!naps) return

  const allNaps: Nap[] = JSON.parse(naps)
  const updatedNaps = allNaps.filter((nap) => nap.id !== id)

  localStorage.setItem(NAPS_KEY, JSON.stringify(updatedNaps))
}


// Children management
export const addChild = (userId: string, child: Omit<Child, "id">) => {
  const users = getUsers()
  const userIndex = users.findIndex((user) => user.id === userId)

  if (userIndex === -1) return null

  const newChild: Child = {
    ...child,
    id: Date.now().toString(),
  }

  users[userIndex].children.push(newChild)
  saveUsers(users)
  setCurrentUser(users[userIndex])

  return newChild
}

export const removeChild = (userId: string, childId: string) => {
  const users = getUsers()
  const userIndex = users.findIndex((user) => user.id === userId)

  if (userIndex === -1) return false

  users[userIndex].children = users[userIndex].children.filter((child) => child.id !== childId)

  saveUsers(users)
  setCurrentUser(users[userIndex])

  return true
}

export const clearAllSleepLogs = () => {
  localStorage.removeItem(SLEEP_LOGS_KEY)
}

export const clearAllNaps = () => {
  localStorage.removeItem(NAPS_KEY)
}
