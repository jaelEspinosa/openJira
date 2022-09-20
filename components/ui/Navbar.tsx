


import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext } from 'react';
import { UIContext } from '../../context/ui/UIContext';
import { useRouter } from 'next/router';

import NextLink from 'next/link';


export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext)
  const router = useRouter()
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton
          onClick={openSideMenu}
          size='large'
          edge='start'
        >
          <MenuOutlinedIcon />
        </IconButton>
        <NextLink href={'/'} passHref >
          <Link underline='hover' color='white'>
            <Typography variant='h5'>OpenJira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}

