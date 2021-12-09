import { Box, Card, Skeleton, Grid } from "union-ui";

export function ContactDetailsSkeleton({ shimmer = true }) {
  return (
    <>
      <Box align="center">
        <Skeleton shimmer={shimmer} variant="circle" size="56px" />
        <Box direction="vertical" ml="16px">
          <Skeleton shimmer={shimmer} width={200} height={16} />
          <Skeleton shimmer={shimmer} width={120} height={16} mt="8px" />
        </Box>
      </Box>
      <Card mt="24px">
        <Card.Body>
          <Grid>
            <Grid.Row>
              <Grid.Col>
                <Skeleton shimmer={shimmer} width={160} height={24} />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col>
                <Skeleton shimmer={shimmer} w="100%" height={8} mt="24px" />
                <Skeleton shimmer={shimmer} w="100%" height={24} mt="8px" />
              </Grid.Col>
              <Grid.Col>
                <Skeleton shimmer={shimmer} w="100%" height={8} mt="24px" />
                <Skeleton shimmer={shimmer} w="100%" height={24} mt="8px" />
              </Grid.Col>
              <Grid.Col>
                <Skeleton shimmer={shimmer} w="100%" height={8} mt="24px" />
                <Skeleton shimmer={shimmer} w="100%" height={24} mt="8px" />
              </Grid.Col>
            </Grid.Row>
          </Grid>
        </Card.Body>
      </Card>
      <Skeleton shimmer={shimmer} width={160} height={16} mt="32px" />
      <Skeleton shimmer={shimmer} w="100%" height={24} mt="24px" />
      <Skeleton shimmer={shimmer} w="100%" height={24} mt="8px" />
      <Skeleton shimmer={shimmer} w="100%" height={24} mt="8px" />
      <Skeleton shimmer={shimmer} w="100%" height={24} mt="8px" />
    </>
  );
}
