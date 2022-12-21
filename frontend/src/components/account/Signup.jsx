import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RichLink, useNavigate } from "react-router-dom";
import { signupAPI } from "../../store/auth/action";
const initData = { firstName: "", lastName: "", email: "", password: "" };

const Signup = () => {
  const [formData, setFormData] = useState(initData);
  const { isLoading, accessToken } = useSelector((store) => store.auth);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) navigate("/");
  }, [accessToken]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForm = (e) => {
    e.preventDefault();
    dispatch(signupAPI(formData))
      .then((res) => {
        toast({
          title: "Signup Successfull",
          description: "Login with same Credentials ",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
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
            <Button
              colorScheme={"blue"}
              type="submit"
              isLoading={isLoading}
              loadingText="Signing up.."
            >
              Sign up
            </Button>
          </Stack>
          <Text my="4" textAlign={"center"}>
            Already have an account?{" "}
            <Link as={RichLink} color={"blue.400"} to="/login">
              Login
            </Link>
          </Text>
        </Box>
      </VStack>
    </VStack>
  );
};
export default Signup;
