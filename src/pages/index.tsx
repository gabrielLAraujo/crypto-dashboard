import { Container } from '@mantine/core';
import CryptoTable from '../components/CryptoTable';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <Container size="md" py="xl">
      <Navbar />
      <CryptoTable />
    </Container>
  );
}
