"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  ImagePlus,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  onRequestImageUpload: () => Promise<string | null>;
  imageUploadDisabled?: boolean;
}

function ToolbarButton({
  onClick,
  active,
  children,
  title,
  disabled,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-lg transition-colors ${
        active ? "bg-[#7A2F2F] text-white" : "text-[#6B6B6B] hover:bg-[#F4EBE2] hover:text-[#7A2F2F]"
      }`}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({ value, onChange, onRequestImageUpload, imageUploadDisabled }: RichTextEditorProps) {
  const imageRequestPending = useRef(false);
  const [addingImage, setAddingImage] = useState(false);
  const [imageError, setImageError] = useState("");
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[300px] px-4 py-3 focus:outline-none font-poppins text-[#2A2A2A] " +
          "[&_h2]:font-cormorant [&_h2]:font-bold [&_h2]:text-[#7A2F2F] [&_h2]:text-2xl [&_h2]:mt-6 [&_h2]:mb-3 " +
          "[&_h3]:font-cormorant [&_h3]:font-bold [&_h3]:text-[#7A2F2F] [&_h3]:text-xl [&_h3]:mt-5 [&_h3]:mb-2 " +
          "[&_p]:text-[#6B6B6B] [&_p]:leading-relaxed [&_p]:mb-3 " +
          "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:mb-3 " +
          "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_ol]:mb-3 " +
          "[&_li]:text-[#6B6B6B] [&_li]:text-sm " +
          "[&_strong]:text-[#2A2A2A] [&_a]:text-[#7A2F2F] [&_a]:underline [&_img]:rounded-xl [&_img]:my-4",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  async function handleAddLink() {
    const url = window.prompt("URL do link:");
    if (!url) return;
    editor!.chain().focus().setLink({ href: url }).run();
  }

  async function handleAddImage() {
    if (!editor || imageRequestPending.current || imageUploadDisabled) return;
    imageRequestPending.current = true;
    setAddingImage(true);
    setImageError("");
    // Keep the insertion point stable while the file picker and upload are open.
    // Insert after the selection, rather than replacing selected article text.
    const position = editor.state.selection.to;
    editor.setEditable(false, false);
    try {
      const url = await onRequestImageUpload();
      if (!url || editor.isDestroyed) return;
      editor.chain().insertContentAt(position, { type: "image", attrs: { src: url } }).run();
    } catch {
      setImageError("Não foi possível inserir a imagem. Tente novamente; o texto foi preservado.");
    } finally {
      if (!editor.isDestroyed) editor.setEditable(true, false);
      imageRequestPending.current = false;
      setAddingImage(false);
    }
  }

  return (
    <div className="rounded-xl border border-[#F4EBE2] bg-white overflow-hidden focus-within:ring-2 focus-within:ring-[#7A2F2F]/30 focus-within:border-[#7A2F2F] transition-all">
      <fieldset disabled={addingImage} className="flex items-center gap-1 px-2 py-2 border-b border-[#F4EBE2] bg-[#FAF7F2] flex-wrap">
        <ToolbarButton
          title="Negrito"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton
          title="Itálico"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton
          title="Título 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 size={16} />
        </ToolbarButton>
        <ToolbarButton
          title="Título 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 size={16} />
        </ToolbarButton>
        <ToolbarButton
          title="Lista com marcadores"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton
          title="Lista numerada"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton title="Inserir link" onClick={handleAddLink}>
          <LinkIcon size={16} />
        </ToolbarButton>
        <ToolbarButton title={addingImage ? "Enviando imagem..." : "Inserir imagem"} disabled={imageUploadDisabled || addingImage} onClick={handleAddImage}>
          <ImagePlus size={16} />
        </ToolbarButton>
      </fieldset>
      {imageError && <p role="alert" className="px-4 py-2 text-sm text-red-600">{imageError}</p>}
      <EditorContent editor={editor} />
    </div>
  );
}
