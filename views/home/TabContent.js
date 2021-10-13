import { useState } from "react";
import { Heading, Box, ToggleMenu } from "union-ui";

const tabItems = [
  { id: "one-to-one", label: "One to One", image: "one-to-one.png" },
  { id: "one-to-many", label: "One to Many", image: "one-to-many.png" },
  { id: "many-to-one", label: "Many to One", image: "many-to-one.png" },
  { id: "many-to-many", label: "Many to Many", image: "many-to-many.png" },
];

export default function TabContent() {
  const [selected, setSelected] = useState(tabItems[0]);

  return (
    <>
      <Heading
        mt="196px"
        mb="24px"
        align="center"
        size="xxlarge"
        className="tabs-title"
      >
        Credit is more fluid with Union
      </Heading>
      <Box mt="24px" align="center" justify="center">
        <Box maxw="560px" mx="auto">
          <img
            src={`/images/${selected.image}`}
            alt={`${selected.id}-relationship`}
          />
        </Box>
      </Box>
      <ToggleMenu items={tabItems} variant="secondary" onChange={setSelected} />
    </>
  );
}
