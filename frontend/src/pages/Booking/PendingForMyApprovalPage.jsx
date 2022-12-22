import { SimpleGrid, Text, useToast, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PendingBookingCard from "../../components/booking/PendingBookingCard";
import { getPendingApprovalAPI, updateBookingAPI } from "../../store/booking/actions";

const PendingForMyApprovalPage = () => {
  const { myPendingApprovalBookings } = useSelector((store) => store.booking);
  const dispatch = useDispatch();
  const toast = useToast();
  useEffect(() => {
    dispatch(getPendingApprovalAPI());
  }, []);

  const handleBooking = (eventid, status) => {
    dispatch(updateBookingAPI(eventid, { status }))
      .then(() => {
        toast({
          title: "Event updated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        dispatch(getPendingApprovalAPI());
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
    <VStack>
      {myPendingApprovalBookings?.length ? (
        <SimpleGrid w="full" gap="4" p="5" columns={{ base: 1, md: 2, lg: 4 }}>
          {myPendingApprovalBookings?.map((el) => {
            return <PendingBookingCard key={el._id} data={el} handleBooking={handleBooking} />;
          })}
        </SimpleGrid>
      ) : (
        <Text mt="5">No Pending Bookings..</Text>
      )}
    </VStack>
  );
};

export default PendingForMyApprovalPage;
