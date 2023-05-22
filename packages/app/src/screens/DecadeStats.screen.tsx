import { useEffect, useState } from "react";
import { YStack, Text, DecadeStatsCardView } from "ui";

const URL = "https://nextjs-grpc.utkusarioglu.com";
const url = [
  // process.env.NEXT_PUBLIC_SCHEME,
  // "://",
  // process.env.NEXT_PUBLIC_DOMAIN_NAME,
  URL,
  "/api/decade-stats",
  "?codes=TUR",
].join("");

interface DecadeStatsApiResponse {
  decadeStats: any[];
}

type DecadeStatsState = DecadeStatsApiResponse & {
  time: number;
  error: boolean;
};

const DECADE_STATS_INITIAL: DecadeStatsState = {
  decadeStats: [],
  time: 0,
  error: false,
};

const DecadeStatsScreen = () => {
  const [list, setList] = useState<DecadeStatsState>(DECADE_STATS_INITIAL);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log({ serverError: res.error });
          setList({
            ...DECADE_STATS_INITIAL,
            time: Date.now(),
            error: true,
          });
          return;
        }
        setList({
          ...DECADE_STATS_INITIAL,
          decadeStats: res.decadeStats,
          time: Date.now(),
        });
      })
      .catch((e) => {
        console.log({ e });
        setList({
          ...DECADE_STATS_INITIAL,
          error: true,
        });
      });
  }, []);

  if (list.error) {
    return (
      <YStack>
        <Text>{url}</Text>
        <Text>There was an error, try again</Text>
      </YStack>
    );
  }

  if (!list.time) {
    return (
      <YStack>
        <Text>{url}</Text>
        <Text>Loading...</Text>
      </YStack>
    );
  }

  if (!list.decadeStats.length) {
    return (
      <YStack>
        <Text>{url}</Text>
        <Text>{new Date(list.time).toLocaleDateString()}</Text>
        <Text>The list is empty</Text>
      </YStack>
    );
  }

  return (
    <YStack>
      <Text>{url}</Text>
      <Text>{new Date(list.time).toLocaleDateString()}</Text>
      {list.decadeStats.map((item) => (
        <DecadeStatsCardView key={item.countryCode} item={item} />
      ))}
    </YStack>
  );
};

export default DecadeStatsScreen;
