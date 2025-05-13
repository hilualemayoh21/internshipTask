import React  from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Stack,
  Box
} from "@mui/material";

function UserCard({users}) {

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        px: { xs:0, sm:"1.6%", md: 4 },
        py: { xs: 4, sm: 6 },
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
        Our Users
      </Typography>

      <Box
        sx={{
          display: "flex", 
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {users.length === 0 ? (
          <Typography variant="h6" align="center">
            No registered users found.
          </Typography>
        ) : (
          users.map((user, index) => (
            <Card
              key={index}
              sx={{
                width: 300,
                p: 2,
                borderRadius: 2,
                backgroundColor: index % 2 === 0 ? "#EDF1F8" : "#ffffff",
                flexShrink: 0,
              }}
              variant="outlined"
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={user.profilePreview}
                  alt={user.name}
                  sx={{ width: 56, height: 56 }}
                />
                <Box>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="body2">{user.email}</Typography>
                </Box>
              </Stack>

              <CardContent sx={{ px: 0 }}>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Phone:</strong> {user.phoneNumber}
                </Typography>
                <Typography variant="body1">
                  <strong>Skill Level:</strong> {user.skillLevel}
                </Typography>

                {user.portfolioLink && (
                  <Typography variant="body1">
                    <strong>Portfolio:</strong>{" "}
                    <a
                      href={user.portfolioLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {user.portfolioLink}
                    </a>
                  </Typography>
                )}

                {user.mentorshipArea && (
                  <Typography variant="body1">
                    <strong>Mentorship Area:</strong> {user.mentorshipArea}
                  </Typography>
                )}

                {user.interestedTopics?.length > 0 && (
                  <>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Interested Topics:</strong>
                    </Typography>
                    <Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    rowGap: 1,
    columnGap: 1,
    mt: 1,
    alignItems: "center",
  }}
>
  {user.interestedTopics.map((topic, i) => (
    <Chip
      key={i}
      label={topic}
      color="primary"
      size="small"
    />
  ))}
</Box> 
</>)}
         </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
}

export default UserCard;