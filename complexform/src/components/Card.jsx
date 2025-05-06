import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";
function UserCard() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("submitedData")) || [];
    setUsers(storedUsers);
  }, []);
  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {users.length === 0 ? (
        <Typography variant="h6" sx={{ margin: "auto" }}>
          No registered users found.
        </Typography>
      ) : (
        users.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ padding: 2, borderRadius: 3, boxShadow: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={user.profilePreview}
                  alt={user.name}
                  sx={{ width: 56, height: 56 }}
                />
                <div>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="body2">{user.email}</Typography>
                </div>
              </Stack>

              <CardContent>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Phone:</strong> {user.phoneNumber}
                </Typography>

                <Typography variant="body1">
                  <strong>Skill Level:</strong> {user.skillLevel}
                </Typography>

                {user.portfolioLink && (
                  <Typography variant="body1">
                    <strong>Portfolio:</strong>{" "}
                    <a href={user.portfolioLink} target="_blank" rel="noreferrer">
                      {user.portfolioLink}
                    </a>
                  </Typography>
                )}

                {user.mentorshipArea && (
                  <Typography variant="body1">
                    <strong>Mentorship Area:</strong> {user.mentorshipArea}
                  </Typography>
                )}

                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Interested Topics:</strong>
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {user.interestedTopics.map((topic, i) => (
                    <Chip key={i} label={topic} color="primary" size="small" />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  )
}

export default UserCard