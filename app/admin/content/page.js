import { prisma } from "@/lib/prisma";
import ContentEditorForm from "@/components/ContentEditorForm";

export default async function AdminContentPage() {
  const content = await prisma.siteContent.findUnique({ where: { id: "main" } });

  return (
    <main className="max-w-content mx-auto px-6 py-16">
      <h1 className="font-display text-3xl">Homepage content</h1>
      <p className="mt-2 text-ink/60 max-w-lg">
        This is what shows on the homepage above the plans list.
      </p>
      <div className="mt-10 max-w-lg">
        <ContentEditorForm initialContent={content} />
      </div>
    </main>
  );
}
