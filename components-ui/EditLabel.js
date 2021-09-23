import { useState, useRef } from "react";
import { Box, Label, Text, Button } from "union-ui";
import useAddressLabels from "hooks/useAddressLabels";

export function EditLabel({ address }) {
  const labelEl = useRef(null);
  const [editting, setEditting] = useState(false);

  const { getLabel, setLabel } = useAddressLabels();

  const handleEdit = () => {
    setEditting(true);
    setTimeout(() => labelEl.current.focus(), 0);
  };

  const handleSave = () => {
    const label = labelEl.current.innerText;
    setLabel(address, label);
    setEditting(false);
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
          {getLabel(address) || ""}
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
              onClick={() => setEditting(false)}
            />
          </>
        ) : (
          <Button variant="pill" label="Edit alias" onClick={handleEdit} />
        )}
      </Box>
    </Box>
  );
}
