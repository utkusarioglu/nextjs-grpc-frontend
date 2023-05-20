import { useEffect, useState } from "react";
import { YStack, Text, DecadeStatsCardView } from "ui";

const URL = "https://nextjs-grpc.utkusarioglu.com/api/inflation";

const DecadeStatsScreen = () => {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((response) => setList(response))
      .catch((e) => console.log(e));
  }, []);

  if (!list.length) {
    return (
      <YStack>
        <Text>{URL}</Text>
        <Text>Loading...</Text>
      </YStack>
    );
  }

  return (
    <YStack>
      <Text>{URL}</Text>
      {list.map((item) => (
        <DecadeStatsCardView key={item.countryCode} item={item} />
      ))}
    </YStack>
  );
};

export default DecadeStatsScreen;
