
export interface Card {
  id: number;
  name: string;
  spanishName: string;
  imageUrl: string;
}

const loteriaCards: Card[] = [
  { id: 1, name: "The Rooster", spanishName: "El Gallo", imageUrl: "/images/carta (1).jpg" },
  { id: 2, name: "The Little Devil", spanishName: "El Diablito", imageUrl: "/images/carta (2).jpg" },
  { id: 3, name: "The Lady", spanishName: "La Dama", imageUrl: "/images4/carta (3).jpg" },
  { id: 4, name: "The Dandy", spanishName: "El Catrín", imageUrl: "/images/carta (4).jpg" },
  { id: 5, name: "The Umbrella", spanishName: "El Paraguas", imageUrl: "/images/carta (5).jpg" },
  { id: 6, name: "The Mermaid", spanishName: "La Sirena", imageUrl: "/images/carta (6).jpg" },
  { id: 7, name: "The Ladder", spanishName: "La Escalera", imageUrl: "/images/carta (7).jpg" },
  { id: 8, name: "The Bottle", spanishName: "La Botella", imageUrl: "/images/carta (8).jpg" },
  { id: 9, name: "The Barrel", spanishName: "El Barril", imageUrl: "/images/carta (9).jpg" },
  { id: 10, name: "The Tree", spanishName: "El Árbol", imageUrl: "/images/carta (10).jpg" },
  { id: 11, name: "The Cantaloupe", spanishName: "El Melón", imageUrl: "/images/carta (11).jpg" },
  { id: 12, name: "The Brave Man", spanishName: "El Valiente", imageUrl: "/images/carta (12).jpg" },
  { id: 13, name: "The Little Bonnet", spanishName: "El Gorrito", imageUrl: "/images/carta (13).jpg" },
  { id: 14, name: "The Death", spanishName: "La Muerte", imageUrl: "/images/carta (14).jpg" },
  { id: 15, name: "The Pear", spanishName: "La Pera", imageUrl: "/images/carta (15).jpg" },
  { id: 16, name: "The Flag", spanishName: "La Bandera", imageUrl: "/images/carta (16).jpg" },
  { id: 17, name: "The Bandolon", spanishName: "El Bandolón", imageUrl: "/images/carta (17).jpg" },
  { id: 18, name: "The Violoncello", spanishName: "El Violoncello", imageUrl: "/images/carta (18).jpg" },
  { id: 19, name: "The Heron", spanishName: "La Garza", imageUrl: "/images/carta (19).jpg" },
  { id: 20, name: "The Bird", spanishName: "El Pájaro", imageUrl: "/images/carta (20).jpg" },
  { id: 21, name: "The Hand", spanishName: "La Mano", imageUrl: "/images/carta (21).jpg" },
  { id: 22, name: "The Boot", spanishName: "La Bota", imageUrl: "/images/carta (22).jpg" },
  { id: 23, name: "The Moon", spanishName: "La Luna", imageUrl: "/images/carta (23).jpg" },
  { id: 24, name: "The Parrot", spanishName: "El Cotorro", imageUrl: "/images/carta (24).jpg" },
  { id: 25, name: "The Drunkard", spanishName: "El Borracho", imageUrl: "/images/carta (25).jpg" },
  { id: 26, name: "The Black Man", spanishName: "El Negrito", imageUrl: "/images/carta (26).jpg" },
  { id: 27, name: "The Heart", spanishName: "El Corazón", imageUrl: "/images/carta (27).jpg" },
  { id: 28, name: "The Watermelon", spanishName: "La Sandía", imageUrl: "/images/carta (28).jpg" },
  { id: 29, name: "The Drum", spanishName: "El Tambor", imageUrl: "/images/carta (29).jpg" },
  { id: 30, name: "The Shrimp", spanishName: "El Camarón", imageUrl: "/images/carta (30).jpg" },
  { id: 31, name: "The Arrows", spanishName: "Las Jaras", imageUrl: "/images/carta (31).jpg" },
  { id: 32, name: "The Musician", spanishName: "El Músico", imageUrl: "/images/carta (32).jpg" },
  { id: 33, name: "The Spider", spanishName: "La Araña", imageUrl: "/images/carta (33).jpg" },
  { id: 34, name: "The Soldier", spanishName: "El Soldado", imageUrl: "/images/carta (34).jpg" },
  { id: 35, name: "The Star", spanishName: "La Estrella", imageUrl: "/images/carta (35).jpg" },
  { id: 36, name: "The Pot", spanishName: "El Cazo", imageUrl: "/images/carta (36).jpg" },
  { id: 37, name: "The World", spanishName: "El Mundo", imageUrl: "/images/carta (37).jpg" },
  { id: 38, name: "The Apache", spanishName: "El Apache", imageUrl: "/images/carta (38).jpg" },
  { id: 39, name: "The Cactus", spanishName: "El Nopal", imageUrl: "/images/carta (39).jpg" },
  { id: 40, name: "The Scorpion", spanishName: "El Alacrán", imageUrl: "/images/carta (40).jpg" },
  { id: 41, name: "The Rose", spanishName: "La Rosa", imageUrl: "/images/carta (41).jpg" },
  { id: 42, name: "The Skull", spanishName: "La Calavera", imageUrl: "/images/carta (42).jpg" },
  { id: 43, name: "The Bell", spanishName: "La Campana", imageUrl: "/images/carta (43).jpg" },
  { id: 44, name: "The Little Jug", spanishName: "El Cantarito", imageUrl: "/images/carta (44).jpg" },
  { id: 45, name: "The Deer", spanishName: "El Venado", imageUrl: "/images/carta (45).jpg" },
  { id: 46, name: "The Sun", spanishName: "El Sol", imageUrl: "/images/carta (46).jpg" },
  { id: 47, name: "The Crown", spanishName: "La Corona", imageUrl: "/images/carta (47).jpg" },
  { id: 48, name: "The Canoe", spanishName: "La Chalupa", imageUrl: "/images/carta (48).jpg" },
  { id: 49, name: "The Pine Tree", spanishName: "El Pino", imageUrl: "/images/carta (49).jpg" },
  { id: 50, name: "The Fish", spanishName: "El Pescado", imageUrl: "/images/carta (50).jpg" },
  { id: 51, name: "The Palm Tree", spanishName: "La Palma", imageUrl: "/images/carta (51).jpg" },
  { id: 52, name: "The Flowerpot", spanishName: "La Maceta", imageUrl: "/images/carta (52).jpg" },
  { id: 53, name: "The Harp", spanishName: "El Arpa", imageUrl: "/images/carta (53).jpg" },
  { id: 54, name: "The Frog", spanishName: "La Rana", imageUrl: "/images/carta (54).jpg" }
];

export default loteriaCards;
