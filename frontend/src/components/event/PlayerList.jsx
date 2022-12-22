import { HStack, Stack, Tag, Text } from "@chakra-ui/react";
import React from "react";

const PlayerList = ({ players }) => {
  return (
    <Stack pt="5">
      <Text fontWeight={"700"} color="telegram.800">
        Already Joined Players
      </Text>
      <HStack flexWrap={"wrap"}>
        {players?.map((player) => {
          return (
            <Tag key={player._id} size="lg">
              {player.firstName} {player.lastName}
            </Tag>
          );
        })}
      </HStack>
    </Stack>
  );
};

export default PlayerList;
