import { defineConfig } from "vitepress";

export default defineConfig({
  title: "SGM",
  description: "Shared Global Memory — an open protocol for persistent, interoperable memory and context sharing between AI agents and software tools.",
  lang: "en-US",
  base: "/sgm/",

  themeConfig: {
    nav: [
      { text: "Specification", link: "/spec/" },
      { text: "Schemas", link: "/schemas/" },
      { text: "Conformance", link: "/conformance/" },
      { text: "Guides", link: "/docs/getting-started" },
      { text: "GitHub", link: "https://github.com/Thairux/sgm" },
    ],
    sidebar: {
      "/spec/": [
        {
          text: "Specification",
          items: [
            { text: "Overview", link: "/spec/overview" },
            { text: "Terminology", link: "/spec/terminology" },
            { text: "Architecture", link: "/spec/architecture" },
            { text: "Memory", link: "/spec/memory" },
            { text: "Retrieval", link: "/spec/retrieval" },
            { text: "Context", link: "/spec/context" },
            { text: "Annotations", link: "/spec/annotations" },
            { text: "Handoffs", link: "/spec/handoffs" },
            { text: "Provenance", link: "/spec/provenance" },
            { text: "Scopes", link: "/spec/scopes" },
            { text: "Capabilities", link: "/spec/capabilities" },
            { text: "Versioning", link: "/spec/versioning" },
            { text: "Errors", link: "/spec/errors" },
            { text: "Security", link: "/spec/security" },
          ],
        },
      ],
      "/docs/": [
        {
          text: "Guides",
          items: [
            { text: "Getting Started", link: "/docs/getting-started" },
            { text: "Implementer Guide", link: "/docs/implementer-guide" },
            { text: "Adopter Guide", link: "/docs/adopter-guide" },
          ],
        },
      ],
    },
    outline: { level: [2, 3] },
    search: { provider: "local" },
    footer: {
      message: "Released under the GNU AGPL v3.0 License.",
      copyright: "SGM Protocol",
    },
  },
});
