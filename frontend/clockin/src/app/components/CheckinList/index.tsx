"use client";

import { Button, Container, List, ListItem, ListItemText } from "@mui/material";
import useHooks from "./hooks";

export default function CheckinList() {
  const { checkins, handleDelete } = useHooks();

  return (
    <Container>
      <List>
        {checkins.map((checkin) => (
          <ListItem key={checkin.id}>
            <ListItemText
              primary={`${checkin.hours} hrs #${checkin.tag} ${checkin.activity}`}
            />
            <Button
              onClick={() => handleDelete(checkin.id)}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
