import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Image,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as RichLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAPI } from "../store/auth/action";
const Links = [
  { name: "New Event", path: "/newEvent" },
  { name: "Signup", path: "/signup" },
];

const NavLink = ({ path, name }) => (
  <Link
    p={2}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    as={RichLink}
    to={path}
  >
    {name}
  </Link>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { accessToken } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleLogout = () => {
    dispatch(logoutAPI());
    toast({
      title: "Logout Successfull",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      zIndex="10000"
      pos={"sticky"}
      top={0}
      bg={useColorModeValue("gray.100", "gray.900")}
      px={4}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Link as={RichLink} to="/">
            <Image
              width={"150px"}
              src="https://www.sport-fm.com.cy/wp-content/uploads/2021/12/Super-Sport-FM-LOGO-2021-WHITE-1.png"
            />
          </Link>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.path} {...link} />
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"} gap="4">
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          {accessToken ? (
            <Menu>
              <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <NavLink path={"/login"} name={"Login / Signup"} />
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.path} {...link} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
export default Navbar;
