import React, { useEffect } from "react";

/* ===== Utils ===== */
const cls = (...args) => args.filter(Boolean).join(" ");
const YT = {
  id: (url) => {
    const m1 = url.match(/youtu\.be\/([\w-]+)/);
    const m2 = url.match(/[?&]v=([\w-]+)/);
    const m3 = url.match(/shorts\/([\w-]+)/);
    return (m1 && m1[1]) || (m2 && m2[1]) || (m3 && m3[1]) || "";
  },
  cover: (url) => {
    const id = YT.id(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
  },
};
// Título a partir do nome do arquivo
const fileTitleFromPath = (p) => {
  const name = (p.split("/").pop() || "").replace(/\.[^.]+$/, "");
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .trim();
};

/* ===== Data ===== */
const ARTIST = {
  name: "Ana Beatriz Tinini",
  role: "Violinista",
  location: "Espírito Santo do Pinhal e Campinas • SP",
  email: "ana1.tinini@gmail.com",
  emailAlt: "anabe.tinini@yahoo.com",
  phone: "+55 19 98608-4874",
  socials: {
    instagram:
      "https://www.instagram.com/anabe_violin?igsh=MTJraTBxbnZkdndldQ%3D%3D&utm_source=qr",
    youtubePrimary: "https://youtu.be/iH2zYScMdtQ?si=2N5sR6PHD2mV6QxC",
  },
  // use /img/capa.jpg como capa do hero
  heroImage: "/img/principal.jpg",
  bio:
    "Olá, muito prazer! Meu nome é Ana Beatriz Tinini, tenho 24 anos, nasci em Espírito Santo do Pinhal, sou violinista e graduanda em Bacharelado Música Erudita com Habilitação em Violino. Foi no Projeto Guri que minha história com o violino começou: aos 11 anos fiz minhas primeiras aulas e tive os primeiros contatos com o instrumento. Desde então, minha curiosidade e amor pelo instrumento e pela música só aumentaram. Em 2018, ingressei no curso de música do Conservatório de Tatuí em São José do Rio Pardo e cursei até 2021. Nesse período, integrei a Orquestra Jazz Sinfônica de São João da Boa Vista, a Orquestra Música na Cidade, a Orquestra Cidade com Música e a Orquestra Filarmônica de Jundiaí. Em 2023, ingressei na graduação em música pela Unicamp, onde atualmente estou no 3º ano. Fui bolsista da Orquestra Sinfônica da Unicamp de 2023 a 2024, atuei também como bolsista no arquivo da mesma orquestra de 2024 a início de 2025. Com a OSU participei do Festival de Música de Campos do Jordão, do Festival de Música de Indaiatuba e do Festival de Música Contemporânea Brasileira. Atualmente faço parte da produção da Orquestra do Departamento do Instituto de Artes da Unicamp.",
};

const CURRICULUM = {
  formacao: [
    {
      titulo: "Bacharelado em Música — Violino",
      instituicao: "Universidade Estadual de Campinas (Unicamp)",
      periodo: "2023 — atual",
    },
    {
      titulo: "Curso de Música",
      instituicao: "Conservatório de Tatuí (São José do Rio Pardo)",
      periodo: "2018 — 2021",
    },
    { titulo: "Projeto Guri", instituicao: "Espírito Santo do Pinhal", periodo: "2012 — 2017" },
  ],
  professores: [
    "Adonhiran Bernard de Almeida Reis",
    "Eduardo Semencio",
    "Emerson Luiz de Biaggi",
  ],
  cursosOficinas: [
    "Masterclass com Carmelo de Los Santos (2020)",
    "Masterclass com Betina Stegmann (2020)",
    "Masterclass com Elisa Fukuda (2020)",
    "Festival de Música nas Montanhas — Poços de Caldas (2020)",
  ],
};

const REPERTORIO = [
  "Bach — Partitas e Sonatas (trechos)",
  "Vivaldi — Concertos para Violino (trechos)",
  "Tchaikovsky / Mendelssohn — peças de concerto (trechos)",
  "Villa-Lobos — obras e arranjos",
  "Piazzolla — tangos e arranjos",
  "Popular brasileira — Pixinguinha e contemporâneos (arranjos)",
];

const PERFORMANCES = [
  { data: "2025", local: "Unicamp", evento: "Produção da Orquestra do Instituto de Artes" },
  { data: "2024", local: "Orquestra Sinfônica da Unicamp", evento: "Bolsista de Arquivo" },
  { data: "2023–2024", local: "Orquestra Sinfônica da Unicamp", evento: "Bolsista Violinista" },
  { data: "2023", local: "Festival de Campos do Jordão", evento: "Participação pela OSU" },
  { data: "2023–2024", local: "Festival de Indaiatuba", evento: "Participação pela OSU" },
  { data: "2023–2024", local: "Festival de Música Contemporânea Brasileira", evento: "Participação pela OSU" },
  { data: "2018–2021", local: "Conservatório de Tatuí", evento: "Atividades acadêmicas e apresentações" },
  {
    data: "2015–2020",
    local: "Orquestras diversas",
    evento:
      "Jazz Sinfônica de São João, Música na Cidade, Filarmônica de Jundiaí, Camerata Experimental de Campinas",
  },
];

/* ===== Arquivos locais (public/) ===== */

// Imagens (coloque estes nomes na pasta public/img/)
const GALLERY = [
  "/img/capa.jpg",
  "/img/1.jpg",
  "/img/2.jpg",
  "/img/3.jpg",
  "/img/4.jpg",
  "/img/5.jpg",
  "/img/6.jpg",
  "/img/7.jpg",
].map((src, i) => ({ src, alt: i === 0 ? "Foto principal" : "Performance" }));

// Concertos (PDFs em public/concerts/). Os títulos são derivados do nome do arquivo:
const POSTERS = [
  "/concerts/OSU - 49º Congresso Internacional de Viola.pdf",
  "/concerts/OSU - Concerto de Boas-Vindas Da OSU Uma Música Clássica e Hip Hop.pdf",
  "/concerts/OSU - Concerto em Comemoração Aos 60 Anos Da FCM.pdf",
  "/concerts/OSU - Encontro Musical de Indaiatuba (EMIn).pdf",
  "/concerts/OSU - Festival de Música Contemporânea Brasileira 8 (FMCB).pdf",
  "/concerts/OSU - Glória, de Antonio Vivaldi.pdf",
  "/concerts/OSU e CCC - Concerto de Natal.pdf",
  "/concerts/OSU - Carmen de Georges Bizet Semana da ELM II.pdf",
  "/concerts/OSU - Cavalleria Rusticana e seleções da ópera de Il Guarany.pdf",
  "/concerts/OSU - Concerto Especial no Festival Dinora de Carvalho.pdf",
  "/concerts/OSU - Concerto OSU e Orquestra do Depto de Música regência de Carlos Fiorini.pdf",
  "/concerts/OSU e IA - Jovens Talentos 2023.pdf",
  "/concerts/OSU - Orquestra do Departamento de Música da Unicamp e OSU Carlos Fiorini regência.pdf",
  "/concerts/OSU - Suor Angélica de Puccini.pdf",
  "/concerts/OSU - Tchaikovskie e J S Bach.pdf",
  "/concerts/programa_digital_osu.pdf",
].map((path) => ({ title: fileTitleFromPath(path), fileUrl: path }));

// Certificados (PDFs em public/certificate/)
const CERTIFICATES = [
  "/certificate/Certificado Comissão Organizadora do 1o Simpósio de Pesquisa em Práticas Interpretativas da Unicamp, Ana Beatriz Tinini.pdf",
  "/certificate/Certificado workshop intitulado Pedagogia e Prática do Ensino de Cordas Friccionadas, Ana Beatriz 2836774.pdf",
].map((path) => ({ title: fileTitleFromPath(path), fileUrl: path }));

// Vídeos
const VIDEOS = [
  { title: "Performance 1", url: "https://youtu.be/iH2zYScMdtQ?si=2N5sR6PHD2mV6QxC" },
  { title: "Performance 2", url: "https://youtu.be/JxR7ZfsrTAY?si=8LEz2BFgQa1m4cjF" },
  { title: "Performance 3", url: "https://youtu.be/lPLL0n4HM1k?si=yHVD_2zDVEPo1FPS" },
  { title: "Performance 4 (Short)", url: "https://youtube.com/shorts/FmJivfJie6E?si=NZT12U_MAdeOVvRk" },
  { title: "Performance 5", url: "https://youtu.be/-gkBvFs9Fyw?si=d7-G4fLRpAZvoPKJ" },
];

/* ===== UI primitives ===== */
const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24 py-16">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  </section>
);
const Card = ({ children, className }) => (
  <div className={cls("rounded-2xl border bg-white shadow-sm", className)}>{children}</div>
);
const CardBody = ({ children, className }) => (
  <div className={cls("p-6 text-neutral-700", className)}>{children}</div>
);
const ButtonLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm hover:bg-neutral-50"
  >
    {children}
  </a>
);

/* ===== Page ===== */
export default function PortfolioAnaBeatrizTinini() {
  useEffect(() => {
    console.log("Portfolio loaded");
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-medium">
            {ARTIST.name} • {ARTIST.role}
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#sobre" className="hover:opacity-70">Sobre</a>
            <a href="#curriculo" className="hover:opacity-70">Currículo</a>
            <a href="#repertorio" className="hover:opacity-70">Repertório</a>
            <a href="#historico" className="hover:opacity-70">Apresentações</a>
            <a href="#fotos" className="hover:opacity-70">Fotos</a>
            <a href="#cartazes" className="hover:opacity-70">Cartazes</a>
            <a href="#certificados" className="hover:opacity-70">Certificados</a>
            <a href="#videos" className="hover:opacity-70">Vídeos</a>
            <a href="#contato" className="hover:opacity-70">Contato</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center py-12">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
              {ARTIST.name}
              <span className="block text-neutral-500 text-xl md:text-2xl mt-2">{ARTIST.role}</span>
            </h1>
            <p className="text-neutral-700 leading-relaxed">{ARTIST.bio}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${ARTIST.email}`}>✉️ Contato</ButtonLink>
              <ButtonLink href={ARTIST.socials.youtubePrimary}>▶️ YouTube</ButtonLink>
              <ButtonLink href={ARTIST.socials.instagram}>📷 Instagram</ButtonLink>
            </div>
          </div>
          <div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <img src={ARTIST.heroImage} alt="Capa da artista" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Section id="sobre" title="Sobre">
        <Card>
          <CardBody>
            <p>
              Participei da Orquestra Filarmônica de Jundiaí, fui bolsista na Orquestra Sinfônica da
              Unicamp (2023–2024) e atuei como bolsista no arquivo da mesma orquestra (2024–início de
              2025). Junto à OSU participei do Festival de Música de Campos do Jordão, Festival de Música
              de Indaiatuba e Festival de Música Contemporânea Brasileira. Atualmente integro a produção
              da Orquestra do Departamento do Instituto de Artes da Unicamp.
            </p>
          </CardBody>
        </Card>
      </Section>

      <Section id="curriculo" title="Currículo Artístico">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardBody>
              <h3 className="font-semibold mb-3">Formação</h3>
              <ul className="space-y-3">
                {CURRICULUM.formacao.map((f, i) => (
                  <li key={i}>
                    <div className="font-medium">{f.titulo}</div>
                    <div className="text-sm text-neutral-600">{f.instituicao}</div>
                    <div className="text-sm text-neutral-500">{f.periodo}</div>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h3 className="font-semibold mb-3">Professores</h3>
              <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                {CURRICULUM.professores.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h3 className="font-semibold mb-3">Cursos e Oficinas</h3>
              <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                {CURRICULUM.cursosOficinas.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </Section>

      <Section id="repertorio" title="Repertório">
        <Card>
          <CardBody>
            <ul className="list-disc pl-5 space-y-1 text-neutral-700">
              {REPERTORIO.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </Section>

      <Section id="historico" title="Histórico de Apresentações">
        <Card>
          <CardBody className="p-0">
            <div className="divide-y">
              {PERFORMANCES.map((p, i) => (
                <div key={i} className="grid md:grid-cols-6 gap-4 px-4 py-4 text-sm">
                  <div className="md:col-span-1 font-medium">{p.data}</div>
                  <div className="md:col-span-2">{p.local}</div>
                  <div className="md:col-span-3 text-neutral-700">{p.evento}</div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </Section>

      <Section id="fotos" title="Fotos de Performances">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map((img, i) => (
            <figure
              key={i}
              className="relative overflow-hidden rounded-xl shadow aspect-square"
            >
              <img
                src={img.src}
                alt={img.alt || `Foto ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </Section>

      <Section id="cartazes" title="Cartazes e Programas">
        <div className="grid md:grid-cols-2 gap-4">
          {POSTERS.map((p, i) => (
            <Card key={i}>
              <CardBody className="flex items-center justify-between gap-4">
                <div className="text-sm">{p.title}</div>
                <ButtonLink href={p.fileUrl}>Abrir arquivo</ButtonLink>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="certificados" title="Certificados e Convites">
        <div className="grid md:grid-cols-2 gap-4">
          {CERTIFICATES.map((c, i) => (
            <Card key={i}>
              <CardBody className="flex items-center justify-between gap-4">
                <div className="text-sm">{c.title}</div>
                <ButtonLink href={c.fileUrl}>Abrir arquivo</ButtonLink>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="videos" title="Vídeos">
        <div className="grid md:grid-cols-2 gap-6">
          {VIDEOS.map((v, i) => (
            <Card key={i}>
              <CardBody className="space-y-3">
                <div className="font-medium text-sm">{v.title}</div>
                <div className="aspect-video overflow-hidden rounded-lg bg-neutral-100">
                  {YT.cover(v.url) ? (
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full h-full relative group"
                    >
                      <img src={YT.cover(v.url)} alt={v.title} className="w-full h-full object-cover" />
                      <span className="absolute inset-0 grid place-items-center bg-black/20 opacity-0 group-hover:opacity-100 transition">
                        <span className="text-white text-sm px-3 py-1 rounded-full border">Assistir ↗</span>
                      </span>
                    </a>
                  ) : (
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full h-full flex items-center justify-center text-neutral-600 hover:text-neutral-800 underline"
                    >
                      Abrir vídeo ↗
                    </a>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="contato" title="Contato">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardBody className="space-y-2 text-sm text-neutral-700">
              <p>✉️ {ARTIST.email}</p>
              <p>✉️ {ARTIST.emailAlt}</p>
              <p>📞 {ARTIST.phone}</p>
              <div className="flex gap-2 pt-2">
                <ButtonLink href={ARTIST.socials.youtubePrimary}>YouTube</ButtonLink>
                <ButtonLink href={ARTIST.socials.instagram}>Instagram</ButtonLink>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="space-y-2 text-sm text-neutral-700">
              <p>📍 {ARTIST.location}</p>
              <p>Disponível para eventos, recitais e colaborações. Envie detalhes por e-mail.</p>
            </CardBody>
          </Card>
        </div>
      </Section>

      <footer className="border-t mt-8">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-neutral-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {ARTIST.name}. Portfólio minimalista.</p>
          <p>Feito para violino.</p>
        </div>
      </footer>
    </div>
  );
}
