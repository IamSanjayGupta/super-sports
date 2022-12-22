import { Tag, Text, VStack, Button, Image, useColorModeValue, Box } from "@chakra-ui/react";
import React from "react";
import { Link as RichLink } from "react-router-dom";

const BookingCard = (data) => {
  const { _id, event, status } = data;

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
          Category: <Tag>{event.category}</Tag>
        </Text>
        <Text fontWeight={"500"}>
          Status: <Tag>{status}</Tag>
        </Text>
        <Button
          as={RichLink}
          to={`/eventDetails/${_id}`}
          size="sm"
          colorScheme={"blue"}
          variant="outline"
        >
          More
        </Button>
      </VStack>
    </VStack>
  );
};

export default BookingCard;
