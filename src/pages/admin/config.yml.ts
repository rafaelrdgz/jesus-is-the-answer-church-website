import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.origin || "http://localhost:4321";

  const config = `backend:
  name: github
  repo: rafaelrdgz/jesus-is-the-answer-church-website
  branch: main
  base_url: ${siteUrl}
  auth_endpoint: oauth

media_folder: "public/uploads"
public_folder: "/uploads"

slug:
  encoding: "unicode"
  clean_accents: true

i18n:
  structure: multiple_folders
  locales: [en, es]
  default_locale: en

collections:
  # Staff - Miembros del personal
  - name: "staff"
    label: "Staff / Personal"
    folder: "src/content/staff"
    create: true
    slug: "{{slug}}"
    i18n: true
    fields:
      - {label: "Name / Nombre", name: "name", widget: "string", i18n: true}
      - {label: "Title / Cargo", name: "title", widget: "string", i18n: true, hint: "e.g., Senior Pastor / Pastor Principal"}
      - {label: "Image", name: "image", widget: "image", folder: "/uploads/staff", required: false, i18n: duplicate}
      - {label: "Email", name: "email", widget: "string", required: false, i18n: duplicate}
      - {label: "Phone", name: "phone", widget: "string", required: false, i18n: duplicate}
      - {label: "Bio", name: "bio", widget: "text", required: false, i18n: true}
      - {label: "Order", name: "order", widget: "number", default: 0, i18n: duplicate}
      - {label: "Draft", name: "draft", widget: "boolean", default: false, i18n: duplicate}
      - {label: "Body / Contenido", name: "body", widget: "markdown", required: false, i18n: true, hint: "Extended bio / Biografía extendida"}

  # Events - Eventos
  - name: "events"
    label: "Events / Eventos"
    folder: "src/content/events"
    create: true
    slug: "{{slug}}"
    i18n: true
    fields:
      - {label: "Title / Título", name: "title", widget: "string", i18n: true}
      - {label: "Date / Fecha", name: "date", widget: "datetime", i18n: duplicate}
      - {label: "End Date / Fecha fin", name: "endDate", widget: "datetime", required: false, i18n: duplicate}
      - {label: "Time / Hora", name: "time", widget: "string", hint: "e.g., 09:00 AM - 11:00 AM", required: false, i18n: true}
      - {label: "Location / Lugar", name: "location", widget: "string", i18n: true}
      - {label: "Image", name: "image", widget: "image", folder: "/uploads/events", i18n: duplicate}
      - {label: "Summary / Resumen", name: "summary", widget: "text", i18n: true}
      - {label: "Tags", name: "tags", widget: "list", required: false, i18n: duplicate}
      - {label: "Registration Link", name: "registrationLink", widget: "string", required: false, i18n: duplicate}
      - {label: "Registration Required", name: "registrationRequired", widget: "boolean", default: false, i18n: duplicate}
      - {label: "Draft", name: "draft", widget: "boolean", default: false, i18n: duplicate}
      - {label: "Body / Contenido", name: "body", widget: "markdown", required: false, i18n: true, hint: "Full event details / Detalles del evento"}

  # Sermons - Predicas
  - name: "sermons"
    label: "Sermons / Predicas"
    folder: "src/content/sermons"
    create: true
    slug: "{{slug}}"
    i18n: true
    fields:
      - {label: "Title / Título", name: "title", widget: "string", i18n: true}
      - {label: "Slug", name: "slug", widget: "string", required: false, i18n: duplicate, hint: "URL-friendly identifier"}
      - {label: "Date / Fecha", name: "date", widget: "datetime", i18n: duplicate}
      - {label: "Speaker / Predicador", name: "speaker", widget: "string", i18n: true}
      - {label: "Series / Serie", name: "series", widget: "string", required: false, i18n: true}
      - {label: "Scripture / Escritura", name: "scripture", widget: "string", required: false, i18n: true}
      - {label: "Audio URL", name: "audioUrl", widget: "string", required: false, i18n: duplicate}
      - {label: "Video URL", name: "videoUrl", widget: "string", required: false, i18n: duplicate}
      - {label: "Image", name: "image", widget: "image", folder: "/uploads/sermons", required: false, i18n: duplicate}
      - {label: "Summary / Resumen", name: "summary", widget: "text", required: false, i18n: true}
      - {label: "Tags", name: "tags", widget: "list", required: false, i18n: duplicate}
      - {label: "Draft", name: "draft", widget: "boolean", default: false, i18n: duplicate}
      - {label: "Body / Contenido", name: "body", widget: "markdown", required: false, i18n: true, hint: "Full sermon notes / Notas de la prédica"}

  # Ministries - Ministerios
  - name: "ministries"
    label: "Ministries / Ministerios"
    folder: "src/content/ministries"
    create: true
    slug: "{{slug}}"
    i18n: true
    fields:
      - {label: "Name / Nombre", name: "name", widget: "string", i18n: true}
      - {label: "Logo", name: "logo", widget: "image", folder: "/uploads/ministries", required: false, i18n: duplicate}
      - {label: "Summary / Resumen", name: "summary", widget: "text", i18n: true}
      - {label: "Coordinator / Coordinador", name: "coordinator", widget: "string", required: false, i18n: duplicate}
      - {label: "Contact / Contacto", name: "contact", widget: "string", required: false, i18n: duplicate, hint: "Email or phone / Email o teléfono"}
      - {label: "Schedule / Horario", name: "schedule", widget: "string", required: false, i18n: true}
      - {label: "Order", name: "order", widget: "number", required: false, i18n: duplicate}
      - {label: "Draft", name: "draft", widget: "boolean", default: false, i18n: duplicate}
      - {label: "Body / Contenido", name: "body", widget: "markdown", required: false, i18n: true, hint: "Full description / Descripción completa"}

  # Blog
  - name: "blog"
    label: "Blog"
    folder: "src/content/blog"
    create: true
    slug: "{{slug}}"
    i18n: true
    fields:
      - {label: "Title / Título", name: "title", widget: "string", i18n: true}
      - {label: "Slug", name: "slug", widget: "string", required: false, i18n: duplicate, hint: "URL-friendly identifier"}
      - {label: "Publish Date / Fecha", name: "pubDate", widget: "datetime", i18n: duplicate}
      - {label: "Description / Descripción", name: "description", widget: "text", i18n: true, hint: "Short description for previews / Descripción corta"}
      - {label: "Author / Autor", name: "author", widget: "string", default: "Church Staff", i18n: true}
      - label: "Image"
        name: "image"
        widget: "object"
        required: false
        i18n: duplicate
        fields:
          - {label: "Image File", name: "url", widget: "image", folder: "/uploads/blog"}
          - {label: "Alt Text", name: "alt", widget: "string", hint: "Describe the image / Describe la imagen"}
      - {label: "Tags", name: "tags", widget: "list", default: ["general"], i18n: duplicate}
      - {label: "Draft", name: "draft", widget: "boolean", default: false, i18n: duplicate}
      - {label: "Article Content / Contenido", name: "body", widget: "markdown", i18n: true, hint: "Full blog post content / Contenido del artículo"}

  # Site Info - Información del sitio
  - name: "siteInfo"
    label: "Site Info / Info del Sitio"
    folder: "src/content/siteInfo"
    create: true
    slug: "{{slug}}"
    i18n: true
    fields:
      - {label: "Title / Título", name: "title", widget: "string", i18n: true, hint: "For identifying the content block / Para identificar el bloque"}
      - {label: "Body / Contenido", name: "body", widget: "markdown", i18n: true, hint: "Content details / Detalles del contenido"}
`;

  return new Response(config, {
    headers: {
      "Content-Type": "text/yaml; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
};
