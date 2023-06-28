export interface GenreModel {
    count: number
    next: any
    previous: any
    results: GenreResult[]
  }
  
  export interface GenreResult {
    id: number
    name: string
    slug: string
    games_count: number
    image_background: string
    games: Game[]
  }
  
  export interface Game {
    id: number
    slug: string
    name: string
    added: number
  }