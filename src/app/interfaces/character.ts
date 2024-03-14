export interface Character {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string
    },
    location: {
        name: string,
        url: string
    },
    image: string,
    episode: string[],
    url: string,
    created: string
}

// {
//     "id":1,
//     "name":"Rick Sanchez",
//     "status":"Alive",
//     "species":"Human",
//     "type":"",
//     "gender":"Male",
//     "origin":{
//         "name":"Earth (C-137)",
//         "url":"https://rickandmortyapi.com/api/location/1"
//     },
//     "location":{
//         "name":"Citadel of Ricks",
//         "url":"https://rickandmortyapi.com/api/location/3"
//     },
//     "image":"https://rickandmortyapi.com/api/character/avatar/1.jpeg",
//     "episode":["https://rickandmortyapi.com/api/episode/50","https://rickandmortyapi.com/api/episode/51"],
//     "url":"https://rickandmortyapi.com/api/character/1",
//     "created":"2017-11-04T18:48:46.250Z"
// }