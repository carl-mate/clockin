import CheckinForm from "../../components/CheckinForm";
import CheckinList from "../../components/CheckinList";
import { Container, Box } from "@mui/material";

export default function CheckinsPage() {
  return (
    <Container>
      <Box my={4}>
        <CheckinForm />
      </Box>
      <Box my={4}>
        <CheckinList />
      </Box>
    </Container>
  );
}
