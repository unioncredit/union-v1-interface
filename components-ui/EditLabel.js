import { useState, useRef, useCallback } from "react";
import { Box, Label, Text, Button } from "union-ui";
import useAddressLabels from "hooks/useAddressLabels";
import setEndOfContentEditable from "util/setEndOfContentEditable";

export function EditLabel({ address }) {
  const labelEl = useRef(null);
  const [editting, setEditting] = useState(false);
  const { getLabel, setLabel } = useAddressLabels();

  const label = getLabel(address);

  const handleSave = useCallback(() => {
    const label = labelEl.current.innerText;
    setLabel(address, label);
    setEditting(false);
    document.removeEventListener("keydown", ignoreEnterKey);
  }, [setLabel, setEditting]);

  const ignoreEnterKey = useCallback(
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSave();
        return;
      }
    },
    [handleSave]
  );

  const handleEdit = () => {
    setEditting(true);
    setTimeout(() => {
      setEndOfContentEditable(labelEl.current);
    }, 0);
    document.addEventListener("keydown", ignoreEnterKey);
  };

  const handleCancel = () => {
    setEditting(false);
    labelEl.current.textContent = label;
  };

  return (
    <Box fluid justify="space-between" align="center" mb="12px">
      <Box direction="vertical">
        <Label size="small" grey={400} as="p" m={0}>
          CONTACT NAME
        </Label>
        <Text
          mb={0}
          size="large"
          contentEditable={editting}
          ref={labelEl}
          className="editable-name"
        >
          {label || ""}
        </Text>
      </Box>
      <Box>
        {editting ? (
          <>
            <Button
              variant="pill"
              color="blue"
              label="Save"
              onClick={handleSave}
            />
            <Button
              ml="4px"
              variant="pill"
              label="Cancel"
              onClick={handleCancel}
            />
          </>
        ) : (
          <Button variant="pill" label="Edit alias" onClick={handleEdit} />
        )}
      </Box>
    </Box>
  );
}
