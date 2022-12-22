import { Heading, HStack, Tag, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApprovedPlayerListAPI } from "../../store/booking/actions";

const PlayerList = ({ eventId }) => {
  const dispatch = useDispatch();
  const { approvedPlayerList } = useSelector((store) => store.booking);

  useEffect(() => {
    eventId && dispatch(getApprovedPlayerListAPI(eventId));
  }, [eventId]);

  return (
    <>
      <Text fontWeight={"700"} color="telegram.800">
        Already Joined Players
      </Text>
      {approvedPlayerList?.length ? (
        <HStack flexWrap={"wrap"}>
          {approvedPlayerList.map((player) => {
            return (
              <Tag key={player._id} size="lg">
                {player.firstName} {player.lastName}
              </Tag>
            );
          })}
        </HStack>
      ) : (
        <Text>No Players</Text>
      )}
    </>
  );
};

export default PlayerList;
