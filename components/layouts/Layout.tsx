import {FC} from 'react'

import Box from '@mui/material/Box'
import Head from 'next/head';
import { Navbar, SideBar } from '../ui';


interface Props {
    title?: string;
    children: any;
}

export const Layout:FC<Props> =  ({title = 'OpenJira', children}) => {
  return (
    <Box sx={{ flexFlow: 1}} >
        <Head>
            <title>{title}</title>
        </Head>
      <Navbar />
      <SideBar />
     <Box sx={{
        padding: '10px 20px'
     }}>
      {children}

     </Box>
     
    </Box>
  )
}

