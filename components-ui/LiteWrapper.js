import { links } from "constants/app";
import Link from "next/link";
import { Layout, Box, Logo, Grid, Row, Col, Label } from "union-ui";

const externalLinks = [
  { label: "Website", href: links.website },
  { label: "Twitter", href: links.twitter },
  { label: "Docs", href: links.docs },
  { label: "Blog", href: links.blog },
];
export function LiteWrapper({ children }) {
  return (
    <Layout>
      <Layout.Main>
        <Grid style={{ display: "flex", flexGrow: 1 }}>
          <Row style={{ width: "100%", margin: 0 }}>
            <Col>
              <Layout.Header
                align="center"
                direction="vertical"
                justify="center"
              >
                <Link href="/">
                  <Logo width="50px" withText />
                </Link>
                <Box mt="42px">
                  {externalLinks.map(({ label, ...props }) => (
                    <Label as="a" mx="21px" {...props} target="_blank">
                      {label}
                    </Label>
                  ))}
                </Box>
              </Layout.Header>
              {children}
            </Col>
          </Row>
        </Grid>
        <Box mb="80px" />
      </Layout.Main>
    </Layout>
  );
}
