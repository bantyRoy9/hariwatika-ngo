import { notFound } from "next/navigation";
import PageEditorFrame from "./PageEditorFrame";

/* Map slug → public URL path + display label */
const PAGE_MAP: Record<string, { path: string; label: string }> = {
  home:         { path: "/",             label: "Home" },
  about:        { path: "/about",        label: "About" },
  blog:         { path: "/blog",         label: "Blog" },
  projects:     { path: "/projects",     label: "Projects" },
  donate:       { path: "/donate",       label: "Donate" },
  volunteer:    { path: "/volunteer",    label: "Volunteer" },
  contact:      { path: "/contact",      label: "Contact" },
  transparency: { path: "/transparency", label: "Transparency" },
  internship:   { path: "/internship",   label: "Internship" },
  registration: { path: "/registration", label: "Registration" },
};

export function generateStaticParams() {
  return Object.keys(PAGE_MAP).map((page) => ({ page }));
}

export default async function PageEditorRoute({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const meta = PAGE_MAP[page];
  if (!meta) notFound();

  return <PageEditorFrame publicPath={meta.path} label={meta.label} slug={page} />;
}
