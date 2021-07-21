import Head from "next/head";
import UserManagerStatsView from "views/stats/userManager";

export default function UserManagerPage() {
  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>User Manager | Stats | Union</title>
        <meta property="og:title" content="User Manager | Stats | Union" />
        <meta name="twitter:title" content="User Manager | Stats | Union" />
      </Head>
      <UserManagerStatsView />
    </div>
  );
}
