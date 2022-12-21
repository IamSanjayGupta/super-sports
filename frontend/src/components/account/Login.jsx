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
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link as RichLink } from "react-router-dom";
const initData = { email: "", password: "" };

const Login = () => {
  const [formData, setFormData] = useState(initData);
  const { isLoading } = useSelector((store) => store.auth);

  const handleInput = (e) => {
    const { name, value } = e.target;
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
          Login
        </Heading>

        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack w={"xs"} as={"form"} onSubmit={handleForm} spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input type="email" name="email" onChange={handleInput} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" onChange={handleInput} />
            </FormControl>
            <HStack direction={{ base: "column", sm: "row" }} justify={"space-between"}>
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.400"}>Forgot password?</Link>
            </HStack>
            <Button
              colorScheme={"blue"}
              type="submit"
              isLoading={isLoading}
              loadingText="Loging in..."
            >
              Login
            </Button>
          </Stack>
          <Text my="4" textAlign={"center"}>
            Don't have an account?{" "}
            <Link as={RichLink} color={"blue.400"} to="/signup">
              Sign up
            </Link>
          </Text>
        </Box>
      </VStack>
    </VStack>
  );
};
export default Login;
