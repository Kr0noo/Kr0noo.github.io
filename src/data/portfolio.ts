/**
 * Fuente única de contenido del portafolio.
 * Edita SOLO este archivo para actualizar textos, experiencia y proyectos.
 */

export const perfil = {
  nombre: "Adderly Valverde",
  nombreCompleto: "Adderly Andrés Valverde Ramos",
  alias: "Kr0noo",
  iniciales: "AV",
  titulo: "Desarrollador FullStack Junior",
  // Se escriben y borran en bucle bajo el nombre, en el hero.
  roles: [
    "Desarrollador FullStack",
    "APIs con Django & Spring Boot",
    "Cloud con AWS",
    "Frontend con Next.js",
  ],
  resumen:
    "Desarrollo APIs RESTful escalables y las despliego en la nube. Actualmente en CodeaUni, construyendo con Django REST Framework, Next.js y AWS mientras termino Ingeniería de Sistemas.",
  empresaActual: "CodeaUni",
  ubicacion: "Lima, Perú",
  email: "adderlyramos2@gmail.com",
  telefono: "+51 900 889 763",
  telefonoEnlace: "+51900889763",
  linkedin: "https://linkedin.com/in/adderly-andres-valverde-ramos-333057244/",
  github: "https://github.com/Kr0noo",
  instagram: "https://instagram.com/adderly.r06",
  avatar: "/avatar.jpg",
  cv: "/cv.pdf",
};

export const sobreMi = [
  "Soy desarrollador fullstack junior en CodeaUni, donde construyo y documento APIs RESTful con Django REST Framework y Next.js, y me encargo de la infraestructura cloud en AWS y de servidores Linux.",
  "Antes hice prácticas en J&H Partners desarrollando y manteniendo aplicaciones web, integrando APIs REST y corrigiendo problemas de rendimiento. En ambos equipos trabajé con Scrum y RAD.",
  "En paralelo curso el 10.º ciclo de Ingeniería de Sistemas en la Universidad Autónoma del Perú con 17/20 de promedio ponderado. Me interesa especialmente lo que cruza backend, cloud e inteligencia artificial.",
];

export const educacion = {
  institucion: "Universidad Autónoma del Perú",
  carrera: "Ingeniería de Sistemas",
  ciclo: "10.º ciclo",
  periodo: "2022 – Presente",
  ubicacion: "Lima, Perú",
  promedio: "17 / 20",
  reconocimientos: ["Doble finalista de Expotec 2025-1 y 2025-2"],
};

/** `numero` activa el contador animado; sin él, `valor` se muestra tal cual. */
export const datosRapidos: {
  etiqueta: string;
  valor: string;
  numero?: number;
  sufijo?: string;
}[] = [
  { etiqueta: "Ciclo", valor: "10.º", numero: 10, sufijo: ".º" },
  { etiqueta: "Promedio ponderado", valor: "17 / 20" },
  { etiqueta: "Certificaciones", valor: "8", numero: 8 },
  { etiqueta: "Idiomas", valor: "Español nativo · Inglés básico" },
];

export type Experiencia = {
  puesto: string;
  empresa: string;
  periodo: string;
  actual?: boolean;
  logros: string[];
  tecnologias: string[];
};

export const experiencia: Experiencia[] = [
  {
    puesto: "Desarrollador FullStack Junior",
    empresa: "CodeaUni",
    periodo: "Abr 2026 – Actualidad",
    actual: true,
    logros: [
      "Implementación y documentación de APIs RESTful escalables con Django REST Framework y Next.js.",
      "Gestión de proyectos con Scrum y RAD usando Jira, mejorando la coordinación del equipo.",
      "Desarrollo de experiencias VR/XR en C# con sus respectivas integraciones por API.",
      "Infraestructura cloud en AWS y Hostinger, con administración de servidores Linux.",
    ],
    tecnologias: [
      "Django REST Framework",
      "Next.js",
      "C#",
      "AWS",
      "Linux",
      "Jira",
    ],
  },
  {
    puesto: "Practicante de Desarrollador Web",
    empresa: "J&H Partners",
    periodo: "Ene 2026 – Jul 2026",
    logros: [
      "Desarrollo y mantenimiento de aplicaciones web en producción.",
      "Integración y consumo de APIs REST para funcionalidades de backend.",
      "Optimización y corrección de errores para mejorar rendimiento y experiencia de usuario.",
      "Control de versiones y despliegues con Git y GitHub, bajo metodologías RAD y Scrum.",
    ],
    tecnologias: ["JavaScript", "APIs REST", "Git", "GitHub", "Scrum"],
  },
];

export const stack = [
  {
    categoria: "Lenguajes",
    items: ["Python", "JavaScript", "Java", "C#", "SQL"],
  },
  {
    categoria: "Backend",
    items: [
      "Django REST Framework",
      "Spring Boot",
      "APIs REST",
      "Microservicios",
      ".NET",
    ],
  },
  {
    categoria: "Frontend",
    items: ["Next.js", "React", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    categoria: "Datos & Cloud",
    items: ["AWS", "MySQL", "Hostinger", "Linux", "Power BI", "Pandas"],
  },
  {
    categoria: "Metodologías & Herramientas",
    items: ["Scrum", "RAD", "Jira", "Git", "GitHub", "Excel"],
  },
];

export type Proyecto = {
  nombre: string;
  tipo?: string;
  descripcion: string;
  detalles: string[];
  tecnologias: string[];
  repo?: string;
  /** El código no es público: se muestra el aviso en vez del enlace a GitHub. */
  privado?: boolean;
  demo?: string;
  /** Captura en /public/proyectos/. Sin ella se dibuja una portada generada. */
  imagen?: string;
  destacado?: boolean;
};

export const proyectos: Proyecto[] = [
  {
    nombre: "ShortCAM",
    tipo: "En producción",
    descripcion:
      "Herramienta que analiza carpetas DCIM de cámaras y detecta huecos y solapes de cobertura entre varias fuentes de grabación.",
    detalles: [
      "Lee solo la cabecera de cada archivo —unos 300 bytes de un vídeo de 3 GB— así que nada se sube ni se copia: el análisis ocurre en el navegador.",
      "Agrupa el material por sesión, carpeta, cámara (vía EXIF) o tipo de archivo, con umbral de hueco configurable.",
      "Línea de tiempo con zoom, detección de duplicados y ajuste de desfase horario por carpeta para cámaras sin sincronizar.",
      "Exporta informes a Excel, marcadores EDL y PDF, con soporte de 23.976 a 60 fps para DaVinci Resolve y Premiere.",
    ],
    tecnologias: [
      "Next.js",
      "TypeScript",
      "File System Access API",
      "EXIF",
      "Web Workers",
    ],
    demo: "https://metaminingmedia.com/shortcam",
    privado: true,
    destacado: true,
  },
  {
    nombre: "QR Codea",
    tipo: "En producción",
    descripcion:
      "Generador de tarjetas de presentación digitales: crea códigos QR con vCard personalizables para networking profesional.",
    detalles: [
      "Flujo de tres pasos: datos de contacto, personalización del QR y descarga.",
      "Personalización de formas, colores, logo y nivel de corrección de errores del código.",
      "Exporta en PNG, SVG y JPG hasta 2000 px, con enlaces editables después de generarlos.",
    ],
    tecnologias: ["Next.js", "React", "vCard", "Canvas / SVG"],
    demo: "https://metaminingmedia.com/qrcodea",
    privado: true,
    destacado: true,
  },
  {
    nombre: "Diagnóstico de Neumonía con IA",
    tipo: "Proyecto académico",
    descripcion:
      "Sistema que analiza radiografías de tórax con deep learning para apoyar el diagnóstico de neumonía.",
    detalles: [
      "Modelo de visión por computadora entrenado sobre imágenes de rayos X.",
      "Procesamiento y limpieza del conjunto de datos con Python y Pandas.",
    ],
    tecnologias: ["Python", "Deep Learning", "Pandas"],
  },
  {
    nombre: "Sistema Web de Control de Inventario",
    tipo: "Proyecto académico",
    descripcion:
      "Aplicación web para gestionar inventario y mantener los datos consistentes entre áreas.",
    detalles: [
      "Desarrollado en equipo de 3 personas con metodología ágil.",
      "Mejoró la precisión de los datos de inventario en un 35 %.",
    ],
    tecnologias: ["JavaScript", "Python", "HTML", "CSS"],
  },
  {
    nombre: "Smart Recommendation Backend",
    tipo: "Proyecto personal",
    descripcion:
      "API RESTful para gestionar usuarios y generar recomendaciones personalizadas a partir de su actividad.",
    detalles: [
      "Capa de persistencia con Spring Data JPA sobre MySQL.",
      "Endpoints REST para el ciclo completo de usuarios (CRUD).",
      "Motor de recomendaciones basado en las preferencias registradas.",
    ],
    tecnologias: ["Java", "Spring Boot", "Spring Data JPA", "MySQL", "Maven"],
    repo: "https://github.com/Kr0noo/smart-recommendation-backend",
  },

  /* ─────────────────────────────────────────────────────────────
     PLANTILLA — copia este bloque para añadir un proyecto nuevo:

  {
    nombre: "Nombre del proyecto",
    tipo: "Proyecto personal",
    descripcion: "Una frase que explique qué resuelve.",
    detalles: [
      "Qué construiste y con qué decisión técnica.",
      "Un resultado concreto (rendimiento, usuarios, alcance).",
    ],
    tecnologias: ["Next.js", "Supabase"],
    repo: "https://github.com/Kr0noo/mi-repo",  // omítelo si es privado
    privado: true,                              // opcional
    demo: "https://mi-demo.vercel.app",         // opcional
    imagen: "/proyectos/mi-proyecto.png",       // opcional
  },
  ───────────────────────────────────────────────────────────── */
];

export type Certificacion = {
  nombre: string;
  emisor: string;
  url?: string;
};

export const certificaciones: Certificacion[] = [
  { nombre: "AWS Academy Cloud Architecting", emisor: "AWS Academy" },
  { nombre: "AWS Cloud Foundations", emisor: "AWS Academy" },
  {
    nombre: "AWS Cloud Quest: Cloud Practitioner",
    emisor: "Amazon Web Services",
  },
  {
    nombre: "AWS Cloud Quest: Generative AI Practitioner",
    emisor: "Amazon Web Services",
  },
  { nombre: "Python Essentials 1", emisor: "Cisco / Python Institute" },
  { nombre: "Python Essentials 2", emisor: "Cisco / Python Institute" },
  { nombre: "Python para Minería", emisor: "Formación complementaria" },
  { nombre: "Scrum Fundamentals Certified (SFC)", emisor: "SCRUMstudy" },
];

export const idiomas = [
  { idioma: "Español", nivel: "Nativo" },
  { idioma: "Inglés", nivel: "Básico" },
];

export const navegacion = [
  { href: "#sobre-mi", texto: "Sobre mí" },
  { href: "#experiencia", texto: "Experiencia" },
  { href: "#stack", texto: "Stack" },
  { href: "#proyectos", texto: "Proyectos" },
  { href: "#certificaciones", texto: "Certificaciones" },
  { href: "#contacto", texto: "Contacto" },
];
