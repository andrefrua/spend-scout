import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useUIContext } from "context/UIProvider";

import StyledCustomEditor from "./StyledCustomEditor";
import { CustomEditorProps } from "./CustomEditor.models";

const CustomEditor = (props: CustomEditorProps): JSX.Element => {
  const {
    state: { isDarkMode }
  } = useUIContext();

  return (
    <StyledCustomEditor $ownerState={{ isDarkMode }}>
      {(<ReactQuill theme="snow" {...props} />) as any}
    </StyledCustomEditor>
  );
};

export default CustomEditor;
