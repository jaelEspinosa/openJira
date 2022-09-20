import { useState, useContext } from 'react';
import {Box, Button,TextField} from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui';


export const NewEntry = () => {
   
  
    const [inputValue, setInputValue] = useState('')
    const [touched, setTouched] = useState(false)
    const {addNewEntry} = useContext(EntriesContext)
    const {setIsAddingEntry, isAddingEntry} = useContext(UIContext)
   
   
    const onSave = ()=>{
        if(inputValue.length === 0) return
       addNewEntry(inputValue)
       setInputValue('')
       setTouched(false)
       setIsAddingEntry(false)
       
    }
    
  return (

   
   <Box sx={{marginBottom:2, paddingX:2 }}>  
      {!isAddingEntry ? (
                <Button
                onClick={()=>setIsAddingEntry(true)}
                startIcon={<AddCircleOutlineOutlinedIcon/>}
                fullWidth
                variant='outlined'
                >Nueva Entrada
        </Button>
      ):(
        <>
        <TextField
                fullWidth
                sx={{marginTop: 1, marginBotton: 1}}
                placeholder='Nueva Entrada'
                autoFocus
                multiline
                label='Nueva Entrada'
                helperText={inputValue.length <= 0 && touched && 'ingrese Un valor'}
                error={inputValue.length <= 0 && touched}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onBlur={()=>setTouched(true)}
                            />
        <Box display='flex' justifyContent='space-between' gap='10px' marginTop={2} marginBottom={2}>
             <Button
                size='small'
                variant='text'
                sx={{marging:'5px'}}
                endIcon={<CancelOutlinedIcon/>}
                onClick={()=>setIsAddingEntry(false)}
                >
                Cancelar
            </Button>
            <Button
                color='success'
                size='small'
                variant='outlined'
                sx={{marging:'5px'}}
                endIcon={<SaveOutlinedIcon/>}
                onClick={onSave}
                >
                Guardar
            </Button>                
         </Box>
        </>
      )}           
      
    </Box>
  )
}
