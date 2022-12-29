import SEO from "../components/Global/SEO";
import { Container, Toolbar, Wrapper } from "../styles";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { createEditor, BaseEditor } from "slate";
import { useCallback, useState } from "react";
import { CustomEditor } from "../backend/customEditor";
import { IconLetterT, IconBold, IconItalic, IconCode } from "@tabler/icons";

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
  const iconsSize = 18;
  const iconColor = "rgb(204, 204, 204)";

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
      <Wrapper>
        <Container>
          <Slate editor={editor} value={initialValue}>
            <Toolbar>
              <button
                onMouseDown={(event: any) => {
                  event.preventDefault();
                  CustomEditor.toggleBoldMark(editor);
                }}
              >
                <IconBold size={iconsSize} color={iconColor} />
              </button>
              <button
                onMouseDown={(event: any) => {
                  event.preventDefault();
                  CustomEditor.toggleBoldMark(editor);
                }}
              >
                <IconItalic size={iconsSize} color={iconColor} />
              </button>
              <button
                onMouseDown={(event: any) => {
                  event.preventDefault();
                  CustomEditor.toggleCodeBlock(editor);
                }}
              >
                <IconCode size={iconsSize} color={iconColor} />
              </button>
            </Toolbar>

            {/* Change by keyboard */}
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={(event) => {
                if (!event.ctrlKey) return;

                event.preventDefault();

                switch (event.key) {
                  //Press ' to transform to code block.
                  case "'":
                    CustomEditor.toggleCodeBlock(editor);
                    break;

                  //Press b to transform to bold
                  case "b":
                    CustomEditor.toggleBoldMark(editor);
                    break;
                }
              }}
            />
          </Slate>
        </Container>
      </Wrapper>
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
