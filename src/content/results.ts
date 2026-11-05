import type { photoData } from "@/content/photo-data";

export type ResultCategory = "Micropigmentação" | "Despigmentação" | "Reconstrução" | "Design";
export const RESULT_CATEGORIES: ResultCategory[] = ["Micropigmentação", "Despigmentação", "Reconstrução", "Design"];

type Name = keyof typeof photoData;

export type ResultItem =
  | { id: string; category: ResultCategory; kind: "slider"; before: Name; after: Name; beforeLabel: string; afterLabel: string; alt: string }
  | { id: string; category: ResultCategory; kind: "photo"; photo: Name; alt: string; caption: string };

// Só resultados reais publicados pela Juliana no Instagram. Confirmar autorização das clientes antes da publicação oficial.
export const RESULTS: ResultItem[] = [
  {
    id: "micro-dia-ano",
    category: "Micropigmentação",
    kind: "slider",
    before: "micro-no-dia",
    after: "micro-um-ano",
    beforeLabel: "No dia",
    afterLabel: "Um ano após",
    alt: "Comparação de micropigmentação fio a fio no dia e um ano após",
  },
  {
    id: "micro-fio-a-fio",
    category: "Micropigmentação",
    kind: "photo",
    photo: "fio-a-fio-resultado",
    alt: "Resultado real de micropigmentação fio a fio, olhar frontal",
    caption: "Fio a fio, resultado cicatrizado.",
  },
  {
    id: "micro-avulso",
    category: "Micropigmentação",
    kind: "photo",
    photo: "resultado-avulso",
    alt: "Resultado real de micropigmentação fio a fio, segundo atendimento",
    caption: "Resultado avulso, fio a fio.",
  },
];
