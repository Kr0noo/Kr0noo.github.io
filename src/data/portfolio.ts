/**
 * Fuente única de contenido del portafolio.
 * Edita SOLO este archivo para actualizar textos, proyectos y certificaciones.
 */

export const perfil = {
  nombre: "Adderly Valverde",
  alias: "Kr0noo",
  iniciales: "AV",
  titulo: "Desarrollador de Software & Cloud",
  resumen:
    "Estudiante de Ingeniería de Sistemas (9.º ciclo) enfocado en construir APIs sólidas y desplegarlas en la nube. Busco prácticas preprofesionales donde aportar desde el primer sprint.",
  ubicacion: "Perú",
  email: "adderlyramos2@gmail.com",
  github: "https://github.com/Kr0noo",
  instagram: "https://instagram.com/adderly.r06",
  // Coloca tu CV en /public/cv.pdf y descomenta la línea de abajo para mostrar el botón.
  // cv: "/cv.pdf",
  cv: null as string | null,
  disponible: true,
};

export const sobreMi = [
  "Estoy en el 9.º ciclo de Ingeniería de Sistemas y llevo el desarrollo backend como eje: modelar datos, exponer una API limpia y dejarla corriendo en producción.",
  "Trabajo principalmente con Java y Spring Boot, y complemento con Python y JavaScript. En el lado cloud me formé en AWS y he desplegado servicios con bases de datos gestionadas.",
  "Me manejo con Scrum, me acomodo rápido a un equipo y me interesa especialmente la integración de IA en productos reales.",
];

export const datosRapidos = [
  { etiqueta: "Ciclo", valor: "9.º" },
  { etiqueta: "Enfoque", valor: "Backend & Cloud" },
  { etiqueta: "Certificaciones", valor: "4" },
  { etiqueta: "Estado", valor: "Buscando prácticas" },
];

export const stack = [
  {
    categoria: "Lenguajes",
    items: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "Dart"],
  },
  {
    categoria: "Backend",
    items: ["Spring Boot", "Spring Data JPA", "API REST", "JWT"],
  },
  {
    categoria: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS", "Flutter"],
  },
  {
    categoria: "Datos & Cloud",
    items: ["MySQL", "PostgreSQL", "Supabase", "AWS", "Docker"],
  },
  {
    categoria: "Herramientas",
    items: ["Git", "GitHub", "Postman", "Maven", "Scrum"],
  },
];

export type Proyecto = {
  nombre: string;
  descripcion: string;
  detalles: string[];
  tecnologias: string[];
  repo?: string;
  demo?: string;
  destacado?: boolean;
};

export const proyectos: Proyecto[] = [
  {
    nombre: "Smart Recommendation Backend",
    descripcion:
      "API RESTful para gestionar usuarios y generar recomendaciones personalizadas a partir de su actividad.",
    detalles: [
      "Capa de persistencia con Spring Data JPA sobre MySQL.",
      "Endpoints REST para el ciclo completo de usuarios (CRUD).",
      "Motor de recomendaciones basado en las preferencias registradas.",
    ],
    tecnologias: ["Java", "Spring Boot", "Spring Data JPA", "MySQL", "Maven"],
    repo: "https://github.com/Kr0noo/smart-recommendation-backend",
    destacado: true,
  },

  /* ─────────────────────────────────────────────────────────────
     PLANTILLA — copia este bloque para añadir un proyecto nuevo:

  {
    nombre: "Nombre del proyecto",
    descripcion: "Una frase que explique qué resuelve.",
    detalles: [
      "Qué construiste y con qué decisión técnica.",
      "Un resultado concreto (rendimiento, usuarios, alcance).",
    ],
    tecnologias: ["Next.js", "Supabase"],
    repo: "https://github.com/Kr0noo/mi-repo",
    demo: "https://mi-demo.vercel.app",   // opcional
  },
  ───────────────────────────────────────────────────────────── */
];

export type Certificacion = {
  nombre: string;
  emisor: string;
  url?: string;
};

export const certificaciones: Certificacion[] = [
  { nombre: "AWS Cloud Quest: Cloud Practitioner", emisor: "Amazon Web Services" },
  { nombre: "AWS Cloud Quest: Generative AI Practitioner", emisor: "Amazon Web Services" },
  { nombre: "Python Essentials 2", emisor: "Cisco / Python Institute" },
  { nombre: "Scrum Fundamentals Certified (SFC)", emisor: "SCRUMstudy" },
];

export const navegacion = [
  { href: "#sobre-mi", texto: "Sobre mí" },
  { href: "#stack", texto: "Stack" },
  { href: "#proyectos", texto: "Proyectos" },
  { href: "#certificaciones", texto: "Certificaciones" },
  { href: "#contacto", texto: "Contacto" },
];
