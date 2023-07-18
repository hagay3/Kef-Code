import type { EditorState } from "lexical";
import { LexicalComposer, InitialConfigType } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { IS_MOBILE } from './shared/environment';
import { editorConfig } from "./config";
import { EditorPlugins } from "./plugins";
import "./styles.css";

export const Editor: React.FC<{ initialConfig: Partial<InitialConfigType>; appConfig: { debug: boolean; }; onChange: (editorState: EditorState) => void; }> = ({ initialConfig, appConfig, onChange }) => {
  const disableContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { if (IS_MOBILE) e.preventDefault(); };
  return (
    <LexicalComposer initialConfig={{ ...editorConfig, ...initialConfig }}>
      <>
        <ToolbarPlugin />
        <EditorPlugins contentEditable={<ContentEditable className="editor-input" onContextMenu={disableContextMenu} />} onChange={onChange} />
        {appConfig.debug && <TreeViewPlugin />}
      </>
    </LexicalComposer>
  );
};

export default Editor;