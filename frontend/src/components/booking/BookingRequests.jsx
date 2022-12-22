import {
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookingAPI } from "../../store/booking/actions";
import BookingCard from "./BookingCard";

const BookingRequests = () => {
  const { bookings } = useSelector((store) => store.booking);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookingAPI());
  }, []);
  return (
    <VStack w="95vw" m="auto" mt="5" bg={useColorModeValue("gray.50", "gray.800")}>
      <Tabs variant="enclosed" w="full">
        <TabList>
          <Tab>Approved</Tab>
          <Tab>Pending</Tab>
          <Tab>Rejected</Tab>
          <Tab>Expired</Tab>
        </TabList>
        {bookings && (
          <TabPanels>
            {/* for Approved request */}
            <TabPanel>
              <SimpleGrid w="full" gap="4" columns={{ base: 1, md: 2, lg: 4 }}>
                {bookings
                  .filter((booking) => booking.status === "Approved")
                  .map((el) => {
                    return <BookingCard key={el._id} {...el} />;
                  })}
              </SimpleGrid>
            </TabPanel>
            {/* for Pending request */}
            <TabPanel>
              <SimpleGrid w="full" gap="4" columns={{ base: 1, md: 2, lg: 4 }}>
                {bookings
                  .filter((booking) => booking.status === "Pending")
                  .map((el) => {
                    return <BookingCard key={el._id} {...el} />;
                  })}
              </SimpleGrid>
            </TabPanel>

            {/* for rejected request */}
            <TabPanel>
              <SimpleGrid w="full" gap="4" columns={{ base: 1, md: 2, lg: 4 }}>
                {bookings
                  .filter((booking) => booking.status === "Rejected")
                  .map((el) => {
                    return <BookingCard key={el._id} {...el} />;
                  })}
              </SimpleGrid>
            </TabPanel>
            {/* for Expired request */}
            <TabPanel>
              <SimpleGrid w="full" gap="4" columns={{ base: 1, md: 2, lg: 4 }}>
                {bookings
                  .filter((booking) => booking.status === "Expired")
                  .map((el) => {
                    return <BookingCard key={el._id} {...el} />;
                  })}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        )}
      </Tabs>
    </VStack>
  );
};

export default BookingRequests;
