import { LIVEBASE_CATEGORY } from "@/config";

export type Visual = "brow" | "follicle" | "laser" | "leaf" | "lens";

export interface Service {
  slug: string;
  href: string;
  name: string;
  eyebrow: string;
  title: string;
  lead: string;
  summary: string;
  category: keyof typeof LIVEBASE_CATEGORY;
  waName: string;
  metaTitle: string;
  metaDescription: string;
  featured?: boolean;
  visual: Visual;
  benefits: string[];
  what: { title: string; paragraphs: string[] };
  forWhom: string[];
  how: { title: string; text: string }[];
  extra?: { title: string; paragraphs: string[] }[];
  note?: string;
  faq: { q: string; a: string }[];
  related: string[];
  photo?: "fio-a-fio-resultado" | "juliana-blazer" | "resultado-avulso";
}

export const SERVICES: Service[] = [
  {
    slug: "tricologia",
    href: "/tricologia/",
    name: "Queda de cabelo",
    eyebrow: "Tricologia",
    title: "Queda de cabelo: primeiro entender o seu caso.",
    lead: "Avaliação tricológica e acompanhamento mensal para cuidar do couro cabeludo e controlar a queda, com um plano feito para você.",
    summary: "Avaliação tricológica, tratamento capilar e acompanhamento mensal do couro cabeludo.",
    category: "tricologia",
    waName: "queda de cabelo",
    metaTitle: "Tricologia e queda de cabelo em Nova Odessa | Juliana Rosa",
    metaDescription:
      "Tratamento para queda de cabelo em Nova Odessa: avaliação tricológica, plano individual e acompanhamento mensal do couro cabeludo com Juliana Rosa.",
    featured: true,
    visual: "follicle",
    photo: "juliana-blazer",
    benefits: ["Avaliação do couro cabeludo", "Plano individual de cuidado", "Acompanhamento mensal"],
    what: {
      title: "O que é a avaliação tricológica",
      paragraphs: [
        "A tricologia estuda o fio e o couro cabeludo. Na avaliação, observamos como está a sua pele, a raiz e a espessura dos fios, ouvimos o seu histórico (rotina, alimentação, estresse, hormônios, produtos que você usa) e entendemos o que pode estar por trás da queda.",
        "Com isso, montamos um plano de tratamento capilar para o seu caso. Não existe receita pronta: cabelo caindo pode ter causas diferentes, e cada uma pede um caminho.",
      ],
    },
    forWhom: [
      "Você nota mais fios no ralo, no travesseiro ou na escova do que antes.",
      "O cabelo está mais fino, com falhas ou com o couro cabeludo mais visível.",
      "Há coceira, oleosidade excessiva, descamação ou sensibilidade no couro cabeludo.",
      "Você quer acompanhar a saúde do cabelo com quem olha o fio de perto.",
    ],
    how: [
      { title: "Avaliação", text: "Conversa e análise do couro cabeludo e dos fios, para entender o seu caso." },
      { title: "Plano", text: "Indicamos o tratamento capilar adequado e explicamos cada etapa, sem pressa." },
      { title: "Tratamento", text: "Sessões de tratamento tricológico, com cuidados em casa orientados por nós." },
      { title: "Acompanhamento mensal", text: "A cada mês revemos a evolução e ajustamos o plano. O 1º mês e o acompanhamento a partir do 2º têm horários próprios na agenda." },
    ],
    extra: [
      {
        title: "Tricologia integrada: couro cabeludo e sobrancelha",
        paragraphs: [
          "Cabelo e sobrancelha respondem à saúde do organismo: estresse, alterações hormonais e inflamações silenciosas podem refletir nos dois. Por isso olhamos para o conjunto, e não só para o fio isolado.",
          "Quando a queixa é de sobrancelha, a avaliação tricológica ajuda a entender se há algo no folículo que merece cuidado antes de qualquer procedimento estético.",
        ],
      },
    ],
    note: "Quando necessário, indicamos a avaliação de um médico dermatologista.",
    faq: [
      { q: "Toda queda de cabelo é tratável na tricologia?", a: "Cada caso é avaliado individualmente. Em alguns, o acompanhamento tricológico é o caminho. Em outros, indicamos a avaliação de um médico dermatologista. Não prometemos resultados: oferecemos uma avaliação honesta." },
      { q: "Quanto tempo leva para ver diferença?", a: "Varia de pessoa para pessoa e depende da causa da queda. Por isso o acompanhamento é mensal: revemos a evolução e ajustamos o plano." },
      { q: "Preciso levar exames na avaliação?", a: "Se você tiver exames recentes, leve. Eles ajudam a entender o contexto. Se não tiver, a avaliação acontece normalmente e, se for o caso, orientamos o que investigar." },
      { q: "A avaliação substitui a consulta médica?", a: "Não. A tricologia estética não substitui o médico. Quando necessário, indicamos a avaliação de um médico dermatologista." },
      { q: "Como funciona o acompanhamento mensal?", a: "No primeiro mês fazemos o tratamento inicial. A partir do segundo, as sessões de acompanhamento revisam a evolução do couro cabeludo e ajustam o plano." },
      { q: "O que devo evitar antes da avaliação?", a: "Se possível, venha com o cabelo no seu padrão de rotina, sem tratamentos químicos muito recentes. Na hora de agendar, conversamos sobre qualquer dúvida." },
    ],
    related: ["micropigmentacao-fio-a-fio", "reconstrucao-de-fios"],
  },
  {
    slug: "micropigmentacao-fio-a-fio",
    href: "/sobrancelhas/micropigmentacao-fio-a-fio/",
    name: "Micropigmentação",
    eyebrow: "Sobrancelhas · fio a fio",
    title: "Micropigmentação fio a fio: o fio real, com naturalidade.",
    lead: "Uma sobrancelha preenchida de forma natural, desenhada para o seu rosto. Primeiro a avaliação, depois o procedimento, depois o acompanhamento.",
    summary: "Fio a fio realista, com avaliação, renovação e retoque.",
    category: "micropigmentacao",
    waName: "micropigmentação de sobrancelha",
    metaTitle: "Micropigmentação fio a fio em Nova Odessa | Juliana Rosa",
    metaDescription:
      "Micropigmentação de sobrancelha fio a fio realista em Nova Odessa. Avaliação do seu caso, resultado cicatrizado natural, renovação e retoque.",
    featured: true,
    visual: "brow",
    photo: "fio-a-fio-resultado",
    benefits: ["Desenho pensado para o seu rosto", "Resultado cicatrizado natural", "Renovação e retoque"],
    what: {
      title: "O que é o fio a fio realista",
      paragraphs: [
        "Na micropigmentação fio a fio, cada traço reproduz a direção natural dos seus pelos. O objetivo é uma sobrancelha preenchida, leve e que ninguém percebe que foi feita. Para quem tem falhas, assimetrias ou fios muito finos, ela devolve moldura ao olhar sem o aspecto de maquiagem.",
        "O resultado final aparece depois da cicatrização: logo após o procedimento a cor está mais intensa e, com o tempo, assenta. Por isso mostramos aqui resultados cicatrizados.",
      ],
    },
    forWhom: [
      "Você tem falhas, fios finos ou sobrancelhas ralas e quer preenchimento natural.",
      "Você perdeu fios por depilação em excesso ou quer corrigir assimetrias.",
      "Você quer acordar pronta, sem desenhar a sobrancelha todos os dias.",
      "Você tem receio de ficar artificial ou marcada e quer conversar antes de decidir.",
    ],
    how: [
      { title: "Avaliação", text: "Olhamos o seu rosto, os fios que você tem e o que você deseja. Aqui definimos se a micropigmentação é o melhor caminho." },
      { title: "Desenho e cor", text: "Mapeamos o formato e escolhemos o pigmento para o seu tom de pele e de cabelo, antes de qualquer traço." },
      { title: "Procedimento", text: "Fio a fio, na direção natural dos pelos, com calma e atenção aos detalhes." },
      { title: "Cicatrização e retoque", text: "Orientamos os cuidados do período de cicatrização e avaliamos o retoque. Depois, a renovação conforme o seu caso." },
    ],
    extra: [
      {
        title: "Cuidados e renovação",
        paragraphs: [
          "Depois do procedimento, passamos instruções por escrito: o que fazer e o que evitar na cicatrização. Seguir essas orientações faz diferença no resultado.",
          "A pigmentação não dura para sempre e a duração varia de pessoa para pessoa. Quando for a hora, fazemos a avaliação da renovação para manter o desenho harmonioso.",
        ],
      },
      {
        title: "Se você já tem uma micropigmentação antiga",
        paragraphs: [
          "Se a sua micropigmentação ficou azulada, escura ou fora do formato, a avaliação indica se vale a despigmentação a laser antes de uma nova. A página de despigmentação conta como funciona.",
        ],
      },
    ],
    faq: [
      { q: "Vai ficar artificial?", a: "O fio a fio realista segue a direção dos seus pelos e o objetivo é um resultado leve. Na avaliação mostramos o desenho no seu rosto e combinamos o nível de preenchimento antes de começar." },
      { q: "Quanto tempo dura?", a: "A duração varia de pessoa para pessoa (pele, cuidados, exposição ao sol). Fazemos avaliação de renovação e retoque conforme o seu caso." },
      { q: "Como é a cicatrização?", a: "A cor fica mais intensa nos primeiros dias e assenta com o tempo. Passamos todas as orientações de cuidado. O resultado final é o cicatrizado." },
      { q: "Posso corrigir uma micropigmentação antiga?", a: "Sim, depende do caso. Na avaliação vemos se é o caso de despigmentação a laser antes de uma nova micropigmentação." },
      { q: "Tenho pouco pelo. Dá para fazer?", a: "Sim, o fio a fio é indicado também para quem tem falhas. A avaliação define o melhor caminho para o seu caso." },
      { q: "Preciso fazer avaliação antes?", a: "Sim. A avaliação é o primeiro passo do Método Fio Real: primeiro a verdade do seu caso, depois a indicação." },
      { q: "O que evitar antes do procedimento?", a: "Passamos a lista completa no agendamento. Em geral: seguir as orientações sobre sol, produtos e medicamentos, e avisar sobre qualquer condição de saúde." },
      { q: "Faz retoque?", a: "Sim. O retoque faz parte do acompanhamento e é avaliado depois da cicatrização." },
    ],
    related: ["despigmentacao-a-laser", "design-de-sobrancelha"],
  },
  {
    slug: "reconstrucao-de-fios",
    href: "/sobrancelhas/reconstrucao-de-fios/",
    name: "Reconstrução de fios",
    eyebrow: "Sobrancelhas",
    title: "Reconstrução de fios da sobrancelha.",
    lead: "Para quem perdeu fios ou tirou errado por anos: estimular o corpo a produzir novos fios, com avaliação antes de tudo.",
    summary: "Para quem perdeu fios: estimular a produção de novos fios.",
    category: "reconstrucao",
    waName: "reconstrução de fios da sobrancelha",
    metaTitle: "Reconstrução de fios da sobrancelha em Nova Odessa",
    metaDescription:
      "Reconstrução de fios da sobrancelha em Nova Odessa: avaliação e tratamento para estimular novos fios em quem perdeu pelos ou depilou demais.",
    visual: "follicle",
    benefits: ["Avaliação dos folículos", "Estímulo a novos fios", "Plano individual"],
    what: {
      title: "Como funciona",
      paragraphs: [
        "A retirada constante com pinça, cera ou linha pode enfraquecer o folículo, e algumas sobrancelhas deixam de nascer onde antes nasciam. A reconstrução busca estimular o corpo a produzir novos fios nessas regiões.",
        "Não prometemos um resultado igual para todo mundo: começamos por avaliar a região e entender o que ainda responde ao estímulo.",
      ],
    },
    forWhom: [
      "Você tirou a sobrancelha errada por anos e os fios não voltaram.",
      "Há falhas que você preenche todos os dias com lápis.",
      "Você quer entender se há o que estimular antes de pensar em micropigmentação.",
    ],
    how: [
      { title: "Avaliação", text: "Olhamos a região e o histórico de depilação para entender o que ainda responde." },
      { title: "Plano", text: "Explicamos o tratamento e o que esperar, sem exageros." },
      { title: "Acompanhamento", text: "Revemos a evolução e, se for o caso, indicamos outro caminho." },
    ],
    faq: [
      { q: "Os fios voltam sempre?", a: "Não dá para garantir. Cada caso é avaliado e explicamos na consulta o que esperar." },
      { q: "Precisa parar de tirar a sobrancelha?", a: "Na avaliação orientamos o que fazer com a depilação durante o tratamento." },
      { q: "Combina com micropigmentação?", a: "Pode combinar. Em alguns casos, primeiro estimulamos os fios e depois avaliamos a micropigmentação." },
      { q: "Quantas sessões são necessárias?", a: "Depende do caso. Definimos o plano na avaliação." },
    ],
    related: ["tricologia", "micropigmentacao-fio-a-fio"],
  },
  {
    slug: "despigmentacao-a-laser",
    href: "/sobrancelhas/despigmentacao-a-laser/",
    name: "Despigmentação a laser",
    eyebrow: "Sobrancelhas",
    title: "Despigmentação a laser da micropigmentação antiga.",
    lead: "Sua micropigmentação ficou azulada, escura ou fora do formato? A avaliação mostra o caminho: remover com laser e, se quiser, refazer.",
    summary: "Remoção de micropigmentação antiga, sozinha ou antes de uma nova.",
    category: "despigmentacao",
    waName: "despigmentação de micropigmentação",
    metaTitle: "Despigmentação a laser de sobrancelha em Nova Odessa",
    metaDescription:
      "Despigmentação a laser de micropigmentação antiga (azulada, escura ou fora do formato) em Nova Odessa. Avaliação e plano com Juliana Rosa.",
    visual: "laser",
    benefits: ["Avaliação do pigmento", "Laser sem pressa", "Combina com nova micropigmentação"],
    what: {
      title: "Quando a micropigmentação antiga incomoda",
      paragraphs: [
        "Pigmentos antigos podem mudar de cor com o tempo (ficar azulados, acinzentados ou avermelhados) ou o desenho pode não combinar mais com o seu rosto. A despigmentação a laser clareia o pigmento aos poucos.",
        "Depende de cor, profundidade e do seu organismo. Por isso o primeiro passo é a avaliação.",
      ],
    },
    forWhom: [
      "Sua sobrancelha antiga está escura, chumbada ou assimétrica.",
      "O desenho não combina mais com você.",
      "Você quer refazer com uma micropigmentação nova e mais natural.",
    ],
    how: [
      { title: "Avaliação", text: "Analisamos o pigmento que está na pele e conversamos sobre o que você quer." },
      { title: "Sessões de laser", text: "O número de sessões varia conforme o pigmento e a resposta da pele." },
      { title: "Nova micropigmentação (opcional)", text: "Quando a pele está pronta, avaliamos refazer o desenho com fio a fio realista." },
    ],
    faq: [
      { q: "Remove tudo?", a: "O laser clareia o pigmento progressivamente. O quanto sai depende de cada caso e é explicado na avaliação." },
      { q: "Quantas sessões?", a: "O número de sessões varia. Definimos na avaliação e revemos durante o processo." },
      { q: "Posso refazer a micropigmentação depois?", a: "Em muitos casos sim, quando a pele estiver recuperada. A avaliação indica o melhor momento." },
      { q: "Sai a cor azulada?", a: "Pigmentos azulados ou acinzentados são avaliados caso a caso. Mostramos o que esperar antes de começar." },
    ],
    related: ["micropigmentacao-fio-a-fio", "reconstrucao-de-fios"],
  },
  {
    slug: "design-de-sobrancelha",
    href: "/sobrancelhas/design/",
    name: "Design de sobrancelha",
    eyebrow: "Sobrancelhas",
    title: "Design de sobrancelha que cuida, não só remove.",
    lead: "Design com henna ou tintura, planos mensais e spa de sobrancelhas. Moldura, leveza e presença no olhar, respeitando os seus fios.",
    summary: "Design com henna ou tintura, planos mensais e spa de sobrancelhas.",
    category: "design",
    waName: "design de sobrancelha",
    metaTitle: "Design de sobrancelha em Nova Odessa | Juliana Rosa",
    metaDescription:
      "Design de sobrancelha com henna ou tintura, planos mensais e spa de sobrancelhas em Nova Odessa, com cuidado para a saúde dos fios.",
    visual: "brow",
    benefits: ["Design estratégico", "Henna ou tintura", "Planos mensais"],
    what: {
      title: "Mais que tirar o excesso de pelo",
      paragraphs: [
        "Um bom design considera o seu rosto, o desenho dos fios e a saúde da pele. Limpar apenas o excesso não resolve falhas e pode enfraquecer a região a longo prazo.",
        "Trabalhamos com henna ou tintura conforme o seu caso, e o spa de sobrancelhas cuida da pele ao redor.",
      ],
    },
    forWhom: [
      "Você quer manter a sobrancelha alinhada com regularidade (plano mensal).",
      "Quer valorizar o desenho que já tem, com henna ou tintura.",
      "Quer cuidar da pele e dos fios, não só do formato.",
    ],
    how: [
      { title: "Análise", text: "Estudamos o seu rosto e o desenho natural dos fios." },
      { title: "Design", text: "Definimos o formato e, se desejar, o preenchimento com henna ou tintura." },
      { title: "Manutenção", text: "Planos mensais mantêm o desenho em dia." },
    ],
    faq: [
      { q: "Qual a diferença entre henna e tintura?", a: "Explicamos na avaliação qual combina melhor com seus fios e sua pele." },
      { q: "Como funciona o plano mensal?", a: "É um acompanhamento recorrente para manter o design. Os detalhes aparecem no agendamento." },
      { q: "O que é o spa de sobrancelhas?", a: "Um cuidado com a pele e os fios da região, além do design. Perguntamos o que você precisa na avaliação." },
      { q: "Serve para quem tem falhas?", a: "Sim, o design considera as falhas. Quando indicado, sugerimos outros caminhos." },
    ],
    related: ["micropigmentacao-fio-a-fio", "reconstrucao-de-fios"],
  },
  {
    slug: "laser-e-estetica",
    href: "/laser-e-estetica/",
    name: "Laser e estética",
    eyebrow: "Laser e estética",
    title: "Depilação a laser e estética, com cuidado de perto.",
    lead: "Redução progressiva dos pelos e cuidados com a pele em um espaço privativo e acolhedor em Nova Odessa.",
    summary: "Depilação a laser, limpeza de pele e depilação com linha ou cera.",
    category: "laser",
    waName: "depilação a laser",
    metaTitle: "Depilação a laser e estética em Nova Odessa | Juliana Rosa",
    metaDescription:
      "Depilação a laser (redução progressiva dos pelos), limpeza de pele e depilação com linha ou cera em Nova Odessa, em espaço privativo.",
    visual: "laser",
    benefits: ["Redução progressiva dos pelos", "Limpeza de pele profunda", "Espaço privativo"],
    what: {
      title: "O que oferecemos",
      paragraphs: [
        "A depilação a laser reduz os pelos de forma progressiva: o número de sessões varia de pessoa para pessoa. Atendemos buço, axila, rosto, queixo, pescoço, meia perna, perna completa e virilha.",
        "Também fazemos limpeza de pele profunda, que remove cravos e impurezas, e depilação com linha ou cera para buço e rosto.",
      ],
    },
    forWhom: [
      "Você quer reduzir pelos, lâminas e pelos encravados ao longo do tempo.",
      "Quer cuidar da pele do rosto com uma limpeza profunda.",
      "Prefere linha ou cera para buço e rosto.",
    ],
    how: [
      { title: "Avaliação", text: "Vemos a área, o tipo de pele e de pelo para indicar o melhor protocolo." },
      { title: "Sessões", text: "O número de sessões varia conforme a região e a resposta do corpo." },
      { title: "Manutenção", text: "Revemos a evolução e orientamos os cuidados entre as sessões." },
    ],
    faq: [
      { q: "A depilação a laser é definitiva?", a: "É uma redução progressiva dos pelos. O número de sessões varia e a avaliação indica o que esperar para cada área." },
      { q: "Quais áreas atendem?", a: "Buço, axila, rosto, queixo, pescoço, meia perna, perna completa e virilha." },
      { q: "A limpeza de pele serve para qualquer pele?", a: "A avaliação indica o cuidado adequado ao seu tipo de pele." },
      { q: "Posso fazer linha ou cera?", a: "Sim, para buço e rosto, com agendamento." },
    ],
    related: ["tricologia", "design-de-sobrancelha"],
  },
];

export const bySlug = (slug: string) => SERVICES.find((s) => s.slug === slug)!;
export const FEATURED = SERVICES.filter((s) => s.featured);
export const OTHERS = SERVICES.filter((s) => !s.featured);
