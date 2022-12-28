import SEO from "../components/Global/SEO";
import { Container, Wrapper } from "../styles";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { createEditor, BaseEditor, Transforms, Editor, Text } from "slate";
import { useCallback, useState } from "react";

type CustomElement = { type: string; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

export default function Home() {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback((props: any) => {
    if (props.element.type === "code") {
      return <CodeElement {...props} />;
    } else {
      return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <>
      <SEO title="Rich-Text Editor" />

      <Slate editor={editor} value={initialValue}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (!event.ctrlKey) return;

            event.preventDefault();

            switch (event.key) {
              //Press ' to transform to code block.
              case "'":
                const [match] = Editor.nodes(editor, {
                  match: (n: any) => n.type === "code",
                });

                Transforms.setNodes(
                  editor,
                  { type: match ? "paragraph" : "code" },
                  { match: (n) => Editor.isBlock(editor, n) }
                );

                break;

              //Press b to transform to bold
              case "b":
                Transforms.setNodes(
                  editor,
                  //@ts-ignore
                  { bold: true },
                  { match: (n) => Text.isText(n), split: true }
                );

                break;
            }
          }}
        />
      </Slate>
    </>
  );
}

const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = (props: any) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};
