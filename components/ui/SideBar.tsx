
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton } from '@mui/material';
import {useContext} from 'react'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { UIContext } from '../../context/ui';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';

const menuItems:string[]= ['Inbox','Starred','Send Email','Drafts']

export const SideBar = () => {

  const {  sidemenuOpen, closeSideMenu } = useContext(UIContext)
  

  return (
    <Drawer
         anchor='left'
         open={sidemenuOpen}
         onClose={()=>closeSideMenu()}
    >
        <Box sx={{width: 250}}>
        <Box sx={{padding:'5px 10px'}}>
            <Typography variant='h4'>Menú</Typography>
        </Box>
        <List>
            {
                menuItems.map((item, index) => (
                <ListItem button key={item}>
                  <ListItemIcon>
                    {index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />}
                  </ListItemIcon>
                  <ListItemText primary={ item }/>
                </ListItem>
                ))
            }
        </List>
        <Divider />
        <List>
            {
                menuItems.map((item, index) => (
                <ListItem button key={item}>
                  <ListItemIcon>
                    {index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />}
                  </ListItemIcon>
                  <ListItemText primary={ item }/>
                </ListItem>
                ))
            }
        </List>
        </Box>
        <Divider />
        <IconButton sx={{height:'35px', width:'35px', margin:'10px auto'}} onClick={closeSideMenu}>
           <ReplyOutlinedIcon />

        </IconButton>
        
       
        
    </Drawer>
  )
}
