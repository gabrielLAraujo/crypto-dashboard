
import { useRouter } from 'next/router';
import { Container, Loader, Title, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getAssetById } from '../../lib/coinApi';
import { CryptoAsset } from '@/types/crypto';
import { CryptoChart } from '@/components/cryptoChar';
import axios from 'axios';

export default function AssetPage() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<CryptoAsset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await getAssetById(id as string);
        setData(response);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
        setLoading(false);
      }
    };
    if (id) {
      fetchAsset();
    }
  }, [id]);
  
  if (loading) return <Loader />;
  if (error) return <Text color="red">{error}</Text>;
  return (
    <Container>
      <Title order={2}>{data?.name} ({data?.symbol.toUpperCase()})</Title>
      <Text size="xl">Current Price: ${data?.current_price}</Text>
      <Text size="md">Market Cap: ${data?.market_cap}</Text>
      <Text size="md">24h Volume: ${data?.total_volume}</Text>
      <CryptoChart
        data={
          data?.sparkline_in_7d?.price.map((price, index) => ({
            time: `${index}`,
            price,
          })) || []
        }
      />
      </Container>
  );
}