import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Image, Heading, Text, Spinner, Center } from "@chakra-ui/react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    isAuthenticated && (
      <Box textAlign="center" p={5}>
        <Image
          borderRadius="full"
          boxSize="150px"
          src={user.picture}
          alt={user.name}
          m="auto"
        />
        <Heading as="h2" size="xl" mt={4}>
          {user.name}
        </Heading>
        <Text fontSize="lg">{user.email}</Text>
      </Box>
    )
  );
};

export default Profile;
