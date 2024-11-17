export interface User {
    id: number
    username: string
    password: string
    isAdmin: boolean
    hasVoted: boolean
    votedFor: string
}