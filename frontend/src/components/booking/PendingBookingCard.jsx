import React from "react";
import { Box, Button, HStack, Tag, Text, useColorModeValue, VStack } from "@chakra-ui/react";

const PendingBookingCard = (data) => {
  const { _id, status, event, requester } = data;
  const handleClick = (value) => {
    if (value) {
    }
  };

  return (
    <VStack
      justifyContent="space-between"
      shadow={"md"}
      bg={useColorModeValue("white", "gray.700")}
      alignItems={"flex-start"}
    >
      <Box
        backgroundImage={event.picture}
        backgroundSize="cover"
        width="full"
        height={"200px"}
      ></Box>

      <VStack p="4" alignItems={"flex-start"}>
        <Text fontWeight={"700"}>{event.title}</Text>
        <Text fontWeight={"500"}>
          Player: {requester.firstName} {requester.lastName}
        </Text>
        <Text fontWeight={"500"}>
          Category: <Tag>{event.category}</Tag>
        </Text>
        <HStack>
          <Button size="sm" colorScheme={"blue"} onClick={() => handleClick("Accept")}>
            Accept
          </Button>
          <Button size="sm" colorScheme={"red"} onClick={() => handleClick("Reject")}>
            Reject
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default PendingBookingCard;
