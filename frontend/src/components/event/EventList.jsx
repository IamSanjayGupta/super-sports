import {
  Heading,
  Input,
  Select,
  SimpleGrid,
  Stack,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventsAPI } from "../../store/event/action";
import EventCard from "./EventCard";
import { sportsName } from "../../utils/sportsName";

const EventList = () => {
  const { events } = useSelector((store) => store.event);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(getEventsAPI({ q: searchQuery, category: filter }));
  }, [searchQuery, filter]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <VStack maxW="full" bg={useColorModeValue("gray.50", "gray.800")}>
      <VStack mx={"auto"} maxW={"full"} p={12}>
        <Stack
          flexDir={{ base: "column", md: "row" }}
          pos={"sticky"}
          top="60px"
          justifyContent={"space-between"}
          w="full"
          p="3"
          bg={useColorModeValue("gray.50", "gray.800")}
          zIndex="100"
        >
          <Heading fontSize={"3xl"} display={{ base: "block", md: "none" }}>
            Events
          </Heading>
          <Select
            w="fit-content"
            placeholder="Filter by Category"
            onChange={(e) => setFilter(e.target.value)}
          >
            {sportsName.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </Select>
          <Heading fontSize={"3xl"} display={{ base: "none", md: "block" }}>
            Events
          </Heading>

          <Input onChange={handleSearch} w="xm" placeholder="Type here to search..." />
        </Stack>
        <SimpleGrid w="full" gap="4" columns={{ base: 1, md: 2, lg: 4 }}>
          {events?.map((event) => (
            <EventCard key={event._id} {...event} />
          ))}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export default EventList;
