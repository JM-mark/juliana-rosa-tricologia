// Avaliações reais do Google (texto exato). Sem nota média nem contagem de avaliações.
export interface Review {
  name: string;
  text: string;
}

export const REVIEWS: Review[] = [
  { name: "Glaucia P.", text: "Excelente atendimento, a Juliana é uma profissional excelente e atenciosa!" },
  { name: "Vick T.", text: "Incrível, a Ju recebe-nos super bem e tem mãos de fada com a nossa sobrancelha, super indico." },
  { name: "Lucimar T.", text: "sempre com muito carinho e atenção 🥰" },
  { name: "Marcia B.", text: "Me senti revigorada" },
  { name: "Milcar R.", text: "Profissional maravilhosa" },
];

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica+Juliana+Rosa+Tricologia+e+Est%C3%A9tica+Nova+Odessa";
