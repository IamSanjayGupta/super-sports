import { Tag, Text, VStack, Button, Image, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Link as RichLink } from "react-router-dom";

const EventCard = (event) => {
  const { _id, title, description, picture, schedule, player_limits, category, organizer } = event;

  return (
    <VStack
      justifyContent="space-between"
      shadow={"md"}
      bg={useColorModeValue("white", "gray.700")}
    >
      <Image src={"https://www.w3schools.com/css/img_forest.jpg"} />
      <VStack p="4" alignItems={"flex-start"}>
        <Text fontWeight={"700"}>{title}</Text>
        <Text fontWeight={"500"}>
          Category: <Tag>{category}</Tag>
        </Text>
        <Text fontSize={"sm"}>Schedule: {new Date(schedule).toLocaleString()}</Text>
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

export default EventCard;
