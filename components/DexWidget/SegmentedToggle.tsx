import {  SegmentedControl, Group, Center, Box } from '@mantine/core';
import { DollarSquare,Chainlink} from 'iconsax-react';

export function SegmentedToggle({setActiveTradeMode } : {setActiveTradeMode : React.Dispatch<React.SetStateAction<string>>}) {


  return (
    <Group position="left" my="xl" className='rouded-4xl'>
      <SegmentedControl
        color='dark'
        className='bg-black color-white hover:text-blurple'
        onChange={(value) => setActiveTradeMode(value)}
        data={[
          {
            value: 'fiatonoff',
            label: (
              <Center className=' text-white hover:text-blurple'>
                <DollarSquare size="1rem" />
                <Box ml={10} > 💵 Fiat On/Off</Box>
              </Center>
            ),
          },
          {
            value: 'multichain',
            label: (
              <Center className=' text-white hover:text-blurple'>
                <Chainlink size="1rem"  />
                <Box ml={10} > ⛓️ Multichain Swap</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
}