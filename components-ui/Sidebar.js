import { Navigation } from "components-ui";
import { Layout } from "union-ui";
import { useWindowSize } from "react-use";

export function Sidebar() {
  const { width } = useWindowSize();

  if (width <= 1000) {
    return <Navigation mobile />;
  }

  return (
    <Layout.Sidebar>
      <Navigation />
    </Layout.Sidebar>
  );
}
