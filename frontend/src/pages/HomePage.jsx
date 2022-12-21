import { Heading, useColorModeValue, VStack } from "@chakra-ui/react";
import React from "react";

const HomePage = () => {
  return (
    <VStack h={"88vh"} bg={useColorModeValue("gray.50", "gray.800")}>
      <VStack mx="auto" maxW={"lg"}>
        <Heading mt="5">Welcome to Super Sports</Heading>
      </VStack>
    </VStack>
  );
};

export default HomePage;
