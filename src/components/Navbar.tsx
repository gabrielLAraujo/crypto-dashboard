import { ActionIcon, Group, Title, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

export default function Navbar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group justify="space-between" px="md" py="sm">
      <Title order={3}>Crypto Dashboard</Title>
      <ActionIcon
        onClick={() => toggleColorScheme()}
        variant="default"
        size="lg"
        aria-label="Toggle color scheme"
      >
        {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoonStars size={20} />}
      </ActionIcon>
    </Group>
  );
}
