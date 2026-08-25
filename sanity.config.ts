"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemas";

/**
 * Sanity Studio, mounted at /studio.
 *
 * The three singletons (Ana Sayfa, Dünyamız, Site Ayarları) are pinned to
 * fixed document ids and pulled out of the generic document list, so an editor
 * cannot accidentally create a second copy of a page.
 */

const SINGLETONS = [
  { id: "homePage", type: "homePage", title: "Ana Sayfa" },
  { id: "ourWorldPage", type: "ourWorldPage", title: "Dünyamız" },
  { id: "siteSettings", type: "siteSettings", title: "Site Ayarları" },
];

const singletonTypes = new Set(SINGLETONS.map((s) => s.type));

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Singletons are reachable only through their pinned list items.
    templates: (prev) => prev.filter((t) => !singletonTypes.has(t.schemaType)),
  },
  document: {
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter(({ action }) => action !== "duplicate" && action !== "delete")
        : prev,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("İçerik")
          .items([
            ...SINGLETONS.map((s) =>
              S.listItem()
                .title(s.title)
                .id(s.id)
                .child(S.document().schemaType(s.type).documentId(s.id).title(s.title)),
            ),
            S.divider(),
            S.documentTypeListItem("yacht").title("Yatlar"),
            S.documentTypeListItem("event").title("Haberler / Etkinlikler"),
            S.documentTypeListItem("dealerLocation").title("Bayi ve Servis Ağı"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
