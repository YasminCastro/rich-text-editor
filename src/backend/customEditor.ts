import { Editor, Transforms, Text } from "slate";

export const CustomEditor = {
  //ACTIVE
  isBoldMarkActive(editor: any) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isCodeBlockActive(editor: any) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.type === "code",
    });

    return !!match;
  },

  isItalicMarkActive(editor: any) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.italic === true,
      universal: true,
    });

    return !!match;
  },

  isUnderlineMarkActive(editor: any) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.underline === true,
      universal: true,
    });

    return !!match;
  },

  //TOGGLE

  toggleBoldMark(editor: any) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      //@ts-ignore
      { bold: isActive ? null : true },
      { match: (n: any) => Text.isText(n), split: true }
    );
  },

  toggleItalicMark(editor: any) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    Transforms.setNodes(
      editor,
      //@ts-ignore
      { italic: isActive ? null : true },
      { match: (n: any) => Text.isText(n), split: true }
    );
  },

  toggleUnderlineMark(editor: any) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor);
    Transforms.setNodes(
      editor,
      //@ts-ignore
      { underline: isActive ? null : true },
      { match: (n: any) => Text.isText(n), split: true }
    );
  },

  toggleCodeBlock(editor: any) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : "code" },
      { match: (n: any) => Editor.isBlock(editor, n) }
    );
  },
};
