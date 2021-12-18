import { useState } from "react";
import { Heading, Box, Grid, ToggleMenu, TabNav } from "union-ui";

import UnionTokenStats from "./UnionTokenStats";
import UTokenStats from "./UTokenStats";
import UserManagerStats from "./UserManagerStats";
import AssetManagerStats from "./AssetManagerStats";
import MarketSettingsStats from "./MarketSettingsStats";
import GovernanceStats from "./GovernanceStats";
import useIsMobile from "hooks/useIsMobile";

import styles from "./stats.module.css";

export default function StatsView() {
  const [index, setIndex] = useState(0);
  const isMobile = useIsMobile();

  const handleChange = (_, i) => {
    setIndex(i);
  };

  const handleTabNavClick = (i) => () => {
    setIndex(i);
  };

  const items = [
    { label: "UNION Token", view: UnionTokenStats },
    { label: "uToken", view: UTokenStats },
    { label: "Users", view: UserManagerStats },
    { label: "Assets", view: AssetManagerStats },
    { label: "Market", view: MarketSettingsStats },
    { label: "Governance", view: GovernanceStats },
  ];

  const View = items[index]?.view;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Col>
          <Box
            mb="56px"
            fluid
            align="center"
            justify="center"
            direction="vertical"
          >
            <Heading
              mb="24px"
              size={isMobile ? "large" : "xxlarge"}
              align="center"
            >
              Union Protocol Statistics
            </Heading>
            {!isMobile && (
              <ToggleMenu
                items={items}
                initialActive={0}
                onChange={handleChange}
              />
            )}

            {isMobile && (
              <div className={styles.tabNavWrapper}>
                <TabNav
                  items={items.map((item, i) => ({
                    ...item,
                    onClick: handleTabNavClick(i),
                  }))}
                />
              </div>
            )}
          </Box>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>{View && <View />}</Grid.Row>
    </Grid>
  );
}
