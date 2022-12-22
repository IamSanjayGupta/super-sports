import { SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PendingBookingCard from "../../components/booking/PendingBookingCard";
import { getPendingApprovalAPI } from "../../store/booking/actions";

const PendingForMyApprovalPage = () => {
  const { myPendingApprovalBookings } = useSelector((store) => store.booking);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPendingApprovalAPI());
  }, []);
  return (
    <SimpleGrid w="full" gap="4" p="5" columns={{ base: 1, md: 2, lg: 4 }}>
      {myPendingApprovalBookings?.map((el) => {
        return <PendingBookingCard key={el._id} {...el} />;
      })}
    </SimpleGrid>
  );
};

export default PendingForMyApprovalPage;
