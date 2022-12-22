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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RichLink, useNavigate } from "react-router-dom";
import { loginAPI } from "../../store/auth/action";
const initData = { email: "", password: "" };

const Login = () => {
  const { isLoading, accessToken } = useSelector((store) => store.auth);
  const [formData, setFormData] = useState(initData);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      toast({
        title: "Login Successfull",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
      return;
    }
  }, [accessToken]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleForm = (e) => {
    e.preventDefault();
    dispatch(loginAPI(formData))
      .then((res) => {})
      .catch((err) => {
        toast({
          title: err,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <VStack minH={"100vh"} bg={useColorModeValue("gray.50", "gray.800")}>
      <VStack spacing={8} mx={"auto"} maxW={"lg"} p={6}>
        <Heading textAlign={"center"} fontSize={"4xl"}>
          Login
        </Heading>

        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack w={{ base: "auto", md: "xs" }} as={"form"} onSubmit={handleForm} spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input type="email" name="email" onChange={handleInput} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" onChange={handleInput} />
            </FormControl>
            <Stack direction={{ base: "column", sm: "row" }} justify={"space-between"}>
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.400"}>Forgot password?</Link>
            </Stack>
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
