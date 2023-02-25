import SEO from "../components/Global/SEO";
import { Container, Toolbar, Wrapper } from "../styles";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { createEditor, BaseEditor } from "slate";
import { useCallback, useMemo } from "react";
import { CustomEditor } from "../backend/customEditor";
import { IconBold, IconItalic, IconCode, IconUnderline } from "@tabler/icons";
import { withHistory } from "slate-history";
import BlockButton from "../components/Pages/RichText/Buttons/BlockButton";

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
    children: [{ text: "" }],
  },
];

export default function Home() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const iconsSize = 18;
  const iconLighterColor = "rgb(204, 204, 204)";
  const iconDarkerColor = "#000000";

  const renderElement = useCallback((props: any) => <Element {...props} />, []);

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
              <BlockButton editor={editor} format="heading-one" />
              <BlockButton editor={editor} format="heading-two" />

              <button
                onClick={(event: any) => {
                  event.preventDefault();
                  CustomEditor.toggleBoldMark(editor);
                }}
              >
                <IconBold size={iconsSize} color={iconLighterColor} />
              </button>
              <button
                onMouseDown={(event: any) => {
                  event.preventDefault();
                  CustomEditor.toggleItalicMark(editor);
                }}
              >
                <IconItalic size={iconsSize} color={iconLighterColor} />
              </button>

              <button
                onMouseDown={(event: any) => {
                  event.preventDefault();
                  CustomEditor.toggleUnderlineMark(editor);
                }}
              >
                <IconUnderline size={iconsSize} color={iconLighterColor} />
              </button>

              <button
                onMouseDown={(event: any) => {
                  event.preventDefault();
                  CustomEditor.toggleCodeBlock(editor);
                }}
              >
                <IconCode size={iconsSize} color={iconLighterColor} />
              </button>

              <BlockButton editor={editor} format="bulleted-list" />
              <BlockButton editor={editor} format="numbered-list" />
              <BlockButton editor={editor} format="left" />
              <BlockButton editor={editor} format="center" />
              <BlockButton editor={editor} format="right" />
              <BlockButton editor={editor} format="justify" />
            </Toolbar>

            {/* Change by keyboard */}
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Escreva aqui..."
              style={{ padding: 16 }}
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

                  //Press i to transform to italic
                  case "i":
                    CustomEditor.toggleItalicMark(editor);
                    break;

                  //Press i to transform to italic
                  case "u":
                    CustomEditor.toggleUnderlineMark(editor);
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

const Element = ({ attributes, children, element }: any) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    case "code":
      return (
        <code style={style} {...attributes}>
          {children}
        </code>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
