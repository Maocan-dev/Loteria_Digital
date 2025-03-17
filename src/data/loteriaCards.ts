
export interface LoteriaCard {
  id: number;
  name: string;
  spanishName: string;
  imageUrl: string;
}

const loteriaCards: LoteriaCard[] = [
  { id: 1, name: "The Rooster", spanishName: "El Gallo", imageUrl: "/images/carta (1).jpg" },
  { id: 2, name: "The Devil", spanishName: "El Diablo", imageUrl: "/images/carta (2).jpg" },
  { id: 3, name: "The Lady", spanishName: "La Dama", imageUrl: "/images/carta (3).jpg" },
  { id: 4, name: "The Dandy", spanishName: "El Catrín", imageUrl: "/images/carta (4).jpg" },
  { id: 5, name: "The Umbrella", spanishName: "El Paraguas", imageUrl: "/images/carta (5).jpg" },
  { id: 6, name: "The Mermaid", spanishName: "La Sirena", imageUrl: "/images/carta (6).jpg" },
  { id: 7, name: "The Ladder", spanishName: "La Escalera", imageUrl: "/images/carta (7).jpg" },
  { id: 8, name: "The Bottle", spanishName: "La Botella", imageUrl: "/images/carta (8).jpg" },
  { id: 9, name: "The Barrel", spanishName: "El Barril", imageUrl: "/images/carta (9).jpg" },
  { id: 10, name: "The Tree", spanishName: "El Árbol", imageUrl: "/images/carta (10).jpg" },
  { id: 11, name: "The Melon", spanishName: "El Melón", imageUrl: "/images/carta (11).jpg" },
  { id: 12, name: "The Brave Man", spanishName: "El Valiente", imageUrl: "/images/carta (12).jpg" },
  { id: 13, name: "The Gorrito", spanishName: "El Gorrito", imageUrl: "/images/carta (13).jpg" },
  { id: 14, name: "Death", spanishName: "La Muerte", imageUrl: "/images/carta (14).jpg" },
  { id: 15, name: "The Pear", spanishName: "La Pera", imageUrl: "/images/carta (15).jpg" },
  { id: 16, name: "The Flag", spanishName: "La Bandera", imageUrl: "/images/carta (16).jpg" }
];

// For now, we're using a subset of the full 54-card deck for simplicity
export default loteriaCards;
