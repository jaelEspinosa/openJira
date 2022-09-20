
import { EntriesContext } from '../../context/entries/EntriesContext';
import { EntryCard } from './'
import { EntryStatus } from '../../interfaces'
import { FC, useContext, useMemo } from 'react';
import { List, Paper } from '@mui/material';
import { UIContext } from '../../context/ui';
import {DragEvent} from 'react'
import styles from './EntryList.module.css'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

interface Props {
  status: EntryStatus;
}
export const EntryList:FC<Props> = ({status}) => {

  const {entries, updateEntry} = useContext(EntriesContext)
  const {isDragging, endDragging} = useContext(UIContext)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const entriesByStatus = useMemo(() =>entries.filter(entry => entry.status === status), [entries])

  const allowDrop= (event:DragEvent<HTMLDivElement>)=>{
    event.preventDefault();
  }

  const onDropEntry = (event:DragEvent<HTMLDivElement>)=>{

    const id = event.dataTransfer.getData('text')
    
    const entry = entries.find(e =>e._id === id)!;
    entry.status = status
    
    updateEntry(entry)
    endDragging()
  }
  

  return (
   // TODO: aquí haremos drop
   
   <div className={isDragging ? styles.draggin : ''}
        onDrop={onDropEntry}
        onDragOver={allowDrop}
       >
    <Paper sx={{ height : 'calc(100vh - 250px)', overflowY:'scroll', background:'transparent', padding:'1px 5px', 
                 "&::-webkit-scrollbar":{width: 2}, 
                 "&::-webkit-scrollbar-thumb":{borderRadius:10,background:'whiteSmoke'} }}>
      
       <List sx={{opacity: isDragging ? 0.2 : 1, transition:'all .3s'}}>
          
         {
          entriesByStatus.map(entry => (
            <EntryCard key={entry._id} entry = {entry}/>

          ))
         }
         
     
        
       </List>
       
    </Paper>
    {isDragging && 
           <div className={styles.soltar}>
             <AddCircleOutlinedIcon/>

           </div>
           
           } 

   </div>
  )
}
