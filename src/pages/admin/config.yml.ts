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

collections:
  # Staff - Miembros del personal
  - name: "staff"
    label: "Staff"
    folder: "src/content/staff"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Name", name: "name", widget: "string", isName: true}
      - {label: "Title", name: "title", widget: "string", hint: "e.g., Senior Pastor, Deaconess"}
      - {label: "Image", name: "image", widget: "image", folder: "/uploads/staff", required: false}
      - {label: "Email", name: "email", widget: "string", required: false}
      - {label: "Phone", name: "phone", widget: "string", required: false}
      - {label: "Bio", name: "bio", widget: "text", required: false}
      - {label: "Order", name: "order", widget: "number", default: 0}
      - {label: "Draft", name: "draft", widget: "boolean", default: false}
      - {label: "Body", name: "body", widget: "markdown", required: false, hint: "Extended bio and details"}

  # Events - Eventos
  - name: "events"
    label: "Events"
    folder: "src/content/events"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string", isName: true}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "End Date", name: "endDate", widget: "datetime", required: false}
      - {label: "Time", name: "time", widget: "string", hint: "e.g., 09:00 AM - 11:00 AM", required: false}
      - {label: "Location", name: "location", widget: "string"}
      - {label: "Image", name: "image", widget: "image", folder: "/uploads/events"}
      - {label: "Summary", name: "summary", widget: "text"}
      - {label: "Tags", name: "tags", widget: "list", required: false}
      - {label: "Registration Link", name: "registrationLink", widget: "string", required: false}
      - {label: "Registration Required", name: "registrationRequired", widget: "boolean", default: false}
      - {label: "Draft", name: "draft", widget: "boolean", default: false}
      - {label: "Body", name: "body", widget: "markdown", required: false, hint: "Full event details and description"}

  # Sermons - Predicas
  - name: "sermons"
    label: "Sermons"
    folder: "src/content/sermons"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string", isName: true}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Speaker", name: "speaker", widget: "string"}
      - {label: "Series", name: "series", widget: "string", required: false}
      - {label: "Scripture", name: "scripture", widget: "string", required: false}
      - {label: "Audio URL", name: "audioUrl", widget: "string", required: false}
      - {label: "Video URL", name: "videoUrl", widget: "string", required: false}
      - {label: "Image", name: "image", widget: "image", folder: "/uploads/sermons", required: false}
      - {label: "Summary", name: "summary", widget: "text", required: false}
      - {label: "Tags", name: "tags", widget: "list", required: false}
      - {label: "Draft", name: "draft", widget: "boolean", default: false}
      - {label: "Sermon Overview", name: "body", widget: "markdown", required: false, hint: "Full sermon notes: overview, key points, discussion questions"}

  # Ministries - Ministerios
  - name: "ministries"
    label: "Ministries"
    folder: "src/content/ministries"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Name", name: "name", widget: "string", isName: true}
      - {label: "Logo", name: "logo", widget: "image", folder: "/uploads/ministries", required: false}
      - {label: "Summary", name: "summary", widget: "text"}
      - {label: "Coordinator", name: "coordinator", widget: "string", required: false}
      - {label: "Contact", name: "contact", widget: "string", hint: "Email or phone", required: false}
      - {label: "Schedule", name: "schedule", widget: "string", required: false}
      - {label: "Order", name: "order", widget: "number", required: false}
      - {label: "Draft", name: "draft", widget: "boolean", default: false}
      - {label: "Body", name: "body", widget: "markdown", required: false, hint: "Full ministry description, programs, volunteer info"}

  # Blog - Blog
  - name: "blog"
    label: "Blog"
    folder: "src/content/blog"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string", isName: true}
      - {label: "Publish Date", name: "pubDate", widget: "datetime"}
      - {label: "Description", name: "description", widget: "text", hint: "Short description for previews"}
      - {label: "Author", name: "author", widget: "string", default: "Church Staff"}
      - label: "Image"
        name: "image"
        widget: "object"
        required: false
        fields:
          - {label: "Image File", name: "url", widget: "image", folder: "/uploads/blog"}
          - {label: "Alt Text", name: "alt", widget: "string", hint: "Describe the image for accessibility"}
      - {label: "Tags", name: "tags", widget: "list", default: ["general"]}
      - {label: "Draft", name: "draft", widget: "boolean", default: false}
      - {label: "Article Content", name: "body", widget: "markdown", hint: "Full blog post content"}

  # Site Info - Información del sitio
  - name: "siteInfo"
    label: "Site Info"
    folder: "src/content/siteInfo"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string", hint: "For identifying the content block", isName: true}
      - {label: "Body", name: "body", widget: "markdown", hint: "Content details (hours, schedules, etc.)"}
`;

  return new Response(config, {
    headers: {
      "Content-Type": "text/yaml; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
};
