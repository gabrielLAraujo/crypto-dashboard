import { CryptoAsset } from '@/types/crypto';
import { useCryptoAssets } from '../hooks/useCryptoAssets';
import { Table,Checkbox, ActionIcon, Group, Button } from '@mantine/core';
import { useState } from 'react';
import { IconStar } from '@tabler/icons-react';
import { IconStarFilled } from '@tabler/icons-react';
import { useLocalStorage } from '@mantine/hooks';
import Link from 'next/link';

export default function CryptoTable() {
  const { data, error, isLoading } = useCryptoAssets();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [watchlist, setWatchlist] = useLocalStorage<string[]>({
    key: 'crypto-watchlist',
    defaultValue: [],
  }); 
  
   const toggleFavorite = (id: string) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const filteredData = showFavoritesOnly ? data.filter((asset: CryptoAsset) => watchlist.includes(asset.id)) : data;

  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load data</p>;
  const rows = filteredData.map((asset: CryptoAsset) => (
    <Table.Tr key={asset.id}>
        <Table.Td>
         <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(asset.id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, asset.id]
                : selectedRows.filter((id) => id !== asset.id)
            )
          }
        />
        </Table.Td>
        <Table.Td>
  <ActionIcon
    variant="subtle"
    onClick={() => toggleFavorite(asset.id)}
    aria-label="Toggle favorite"
  >
    {watchlist.includes(asset.id) ? <IconStarFilled size={20} color="yellow" /> : <IconStar size={20} />}
  </ActionIcon>
</Table.Td>

      <Table.Td><img src={asset.image} alt={asset.name} width="25" /></Table.Td>
      <Table.Td><Link href={`/asset/${asset.id}`}>{asset.name}</Link></Table.Td>
      <Table.Td>{asset.symbol.toUpperCase()}</Table.Td>
      <Table.Td>${asset.current_price.toFixed(2)}</Table.Td>
      <Table.Td style={{ color: asset.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
        {asset.price_change_percentage_24h.toFixed(2)}%
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Group>
        <Button
  variant={showFavoritesOnly ? 'filled' : 'outline'}
  onClick={() => setShowFavoritesOnly((prev) => !prev)}
>
  {showFavoritesOnly ? 'Mostrar Todos' : 'Mostrar Favoritos'}
</Button>

    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
        <Table.Th>Select</Table.Th>
        <Table.Th>Fav</Table.Th>
          <Table.Th>Logo</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Price (USD)</Table.Th>
          <Table.Th>24h Change</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    </Group>
  );
}

