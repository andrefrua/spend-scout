import { useEffect, useRef } from "react";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";

import CustomBox from "components/mui/CustomBox";

import { useUIContext } from "context/UIProvider";

import StyledCustomDropzone from "./StyledCustomDropzone";
import { CustomDropzoneProps } from "./CustomDropzone.models";

const CustomDropzone = ({ options }: CustomDropzoneProps): JSX.Element => {
  const {
    state: { isDarkMode }
  } = useUIContext();

  const dropzoneRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    Dropzone.autoDiscover = false;

    function createDropzone() {
      if (dropzoneRef.current) {
        // Get the HTML element from the ref object
        const dropzoneElement = dropzoneRef.current;

        // Initialize Dropzone with the element
        return new Dropzone(dropzoneElement, { ...options });
      }
      return null;
    }

    function removeDropzone() {
      if (Dropzone.instances.length > 0)
        Dropzone.instances.forEach((dz: any) => dz.destroy());
    }

    createDropzone();

    return () => removeDropzone();
  }, [options]);

  return (
    <StyledCustomDropzone
      action="/file-upload"
      ref={dropzoneRef}
      className="form-control dropzone"
      $ownerState={{ isDarkMode }}>
      <CustomBox className="fallback" bgColor="transparent">
        <input name="file" type="file" multiple />
      </CustomBox>
    </StyledCustomDropzone>
  );
};

export default CustomDropzone;
