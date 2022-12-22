import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  HStack,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEventAPI } from "../../store/event/action";
import { sportsName } from "../../utils/sportsName";

const initData = {
  title: "",
  description: "",
  picture: "",
  category: "",
  schedule: "",
  player_limits: 2,
};

const NewEvent = () => {
  const [formData, setFormData] = useState(initData);
  const { isLoading } = useSelector((store) => store.event);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForm = (e) => {
    e.preventDefault();
    dispatch(createEventAPI(formData))
      .then((res) => {
        toast({
          title: "Event Created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <VStack bg={useColorModeValue("gray.50", "gray.800")}>
      <VStack spacing={8} mx={"auto"} maxW={"xl"} p={6}>
        <Heading textAlign={"center"} fontSize={"3xl"}>
          Create New Event
        </Heading>

        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack as={"form"} onSubmit={handleForm} spacing={4}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input type="text" name="title" onChange={handleInput} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Short Description "
                name="description"
                onChange={handleInput}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Select placeholder="Select Category" name="category" onChange={handleInput}>
                {sportsName.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Picture URL</FormLabel>
              <Input type="url" name="picture" onChange={handleInput} />
            </FormControl>
            <HStack>
              <FormControl isRequired>
                <FormLabel>Date and Time</FormLabel>
                <Input type="datetime-local" name="schedule" onChange={handleInput} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Player Limits</FormLabel>
                <NumberInput
                  min={2}
                  defaultValue={2}
                  onChange={(value) => handleInput({ target: { name: "player_limits", value } })}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={isLoading}
              loadingText="Creating Event.."
            >
              Create Event
            </Button>
          </Stack>
        </Box>
      </VStack>
    </VStack>
  );
};

export default NewEvent;
