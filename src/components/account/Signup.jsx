import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
const initData = { firstName: "", lastName: "", email: "", password: "" };

const Signup = () => {
  const [formData, setFormData] = useState(initData);

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };
  const handleForm = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <VStack bg={useColorModeValue("gray.50", "gray.800")}>
      <VStack spacing={8} mx={"auto"} maxW={"lg"} p={6}>
        <Heading textAlign={"center"} fontSize={"4xl"}>
          Sign up
        </Heading>

        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack as={"form"} onSubmit={handleForm} spacing={4}>
            <HStack>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input type="text" name="firstName" onChange={handleInput} />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input type="text" name="lastName" onChange={handleInput} />
              </FormControl>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input type="email" name="email" onChange={handleInput} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" onChange={handleInput} />
            </FormControl>
            <HStack pb="4" direction={{ base: "column", sm: "row" }} justify={"space-between"}>
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.400"}>Forgot password?</Link>
            </HStack>
            <Button colorScheme={"blue"} type="submit">
              Sign up
            </Button>
          </Stack>
        </Box>
      </VStack>
    </VStack>
  );
};
export default Signup;
