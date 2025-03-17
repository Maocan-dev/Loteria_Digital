
export interface LoteriaCard {
  id: number;
  name: string;
  spanishName: string;
  imageUrl: string;
}

const loteriaCards: LoteriaCard[] = [
  { id: 1, name: "The Rooster", spanishName: "El Gallo", imageUrl: "/cards/el-gallo.png" },
  { id: 2, name: "The Devil", spanishName: "El Diablo", imageUrl: "/cards/el-diablo.png" },
  { id: 3, name: "The Lady", spanishName: "La Dama", imageUrl: "/cards/la-dama.png" },
  { id: 4, name: "The Dandy", spanishName: "El Catrín", imageUrl: "/cards/el-catrin.png" },
  { id: 5, name: "The Umbrella", spanishName: "El Paraguas", imageUrl: "/cards/el-paraguas.png" },
  { id: 6, name: "The Mermaid", spanishName: "La Sirena", imageUrl: "/cards/la-sirena.png" },
  { id: 7, name: "The Ladder", spanishName: "La Escalera", imageUrl: "/cards/la-escalera.png" },
  { id: 8, name: "The Bottle", spanishName: "La Botella", imageUrl: "/cards/la-botella.png" },
  { id: 9, name: "The Barrel", spanishName: "El Barril", imageUrl: "/cards/el-barril.png" },
  { id: 10, name: "The Tree", spanishName: "El Árbol", imageUrl: "/cards/el-arbol.png" },
  { id: 11, name: "The Melon", spanishName: "El Melón", imageUrl: "/cards/el-melon.png" },
  { id: 12, name: "The Brave Man", spanishName: "El Valiente", imageUrl: "/cards/el-valiente.png" },
  { id: 13, name: "The Gorrito", spanishName: "El Gorrito", imageUrl: "/cards/el-gorrito.png" },
  { id: 14, name: "Death", spanishName: "La Muerte", imageUrl: "/cards/la-muerte.png" },
  { id: 15, name: "The Pear", spanishName: "La Pera", imageUrl: "/cards/la-pera.png" },
  { id: 16, name: "The Flag", spanishName: "La Bandera", imageUrl: "/cards/la-bandera.png" }
];

// For now, we're using a subset of the full 54-card deck for simplicity
export default loteriaCards;
