import { Editor, Transforms, Element as SlateElement, BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
import {
  IconH1,
  IconH2,
  IconList,
  IconListNumbers,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconAlignJustified,
} from "@tabler/icons";
const iconLighterColor = "rgb(204, 204, 204)";
const iconDarkerColor = "#000000";

interface blockButton {
  editor: BaseEditor & ReactEditor & HistoryEditor;
  format: string;
}

const BlockButton = ({ editor, format }: blockButton) => {
  const iconsSize = 18;

  return (
    <button
      onClick={(event: any) => {
        event.preventDefault();
        toggleBlock({ editor, format });
      }}
    >
      {format === "heading-one" && (
        <IconH1 size={iconsSize} color={iconLighterColor} />
      )}
      {format === "heading-two" && (
        <IconH2 size={iconsSize} color={iconLighterColor} />
      )}

      {format === "bulleted-list" && (
        <IconList size={iconsSize} color={iconLighterColor} />
      )}
      {format === "numbered-list" && (
        <IconListNumbers size={iconsSize} color={iconLighterColor} />
      )}
      {format === "left" && (
        <IconAlignLeft size={iconsSize} color={iconLighterColor} />
      )}
      {format === "right" && (
        <IconAlignRight size={iconsSize} color={iconLighterColor} />
      )}
      {format === "center" && (
        <IconAlignCenter size={iconsSize} color={iconLighterColor} />
      )}
      {format === "justify" && (
        <IconAlignJustified size={iconsSize} color={iconLighterColor} />
      )}
    </button>
  );
};

export default BlockButton;

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const toggleBlock = ({ editor, format }: blockButton) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n: any) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });

  let newProperties: any;

  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }

  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const isBlockActive = (editor: any, format: any, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        //@ts-ignore
        n[blockType] === format,
    })
  );

  return !!match;
};
