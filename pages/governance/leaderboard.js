import Head from "next/head";
import LeaderboardView from "views/leaderboard";

export default function LeaderboardPage() {
  return (
    <div className="gradient-governance pb-8 md:pb-10">
      <Head>
        <title>Leaderboard | Union</title>
        <meta property="og:title" content="Leaderboard | Union" />
        <meta name="twitter:title" content="Leaderboard | Union" />
      </Head>

      <LeaderboardView />
    </div>
  );
}
