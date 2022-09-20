import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import React,{ChangeEvent} from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useState, useMemo, FC, useContext } from 'react';
import { Layout } from '../../components/layouts';
import { GetServerSideProps } from 'next'
import { EntryStatus } from '../../interfaces';
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton, fabClasses } from '@mui/material'

import { dbEntries } from '../../database';
import { Entry } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { useRouter } from 'next/router';
import { getformatDistaceToNow } from '../../utils/dateFuntion';




const ValidStatus: EntryStatus[] = ['pending','in-progress','finished' ]

interface Props{
entry: Entry
}

const EntryPage:FC<Props> = ({entry}) => {

  const router=useRouter()
  const {updateEntry, deleteEntry} = useContext(EntriesContext)
  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)

  const onTextfieldChanged = (e: ChangeEvent<HTMLInputElement>) =>{
        setInputValue(e.target.value)
  }

  const onStatusChanged = (e: ChangeEvent<HTMLInputElement>)=>{
        
    setStatus(e.target.value as EntryStatus)
  }

  const onSave = ()=>{
   if(inputValue.trim().length === 0) return
    const updatedEntry:Entry={
      ...entry,
      status,
      description: inputValue
    }
    updateEntry(updatedEntry, true)
    setTimeout(() => {
      router.push('/')
    }, 800);
  }

  const onDelete = ()=>{
   
    const deletedEntry:Entry={
      ...entry,
      _id:entry._id
    }
    deleteEntry(deletedEntry)
    setTimeout(() => {
      router.push('/')
    }, 800);
  }
  

 const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])


  return (
    <Layout title={inputValue.substring(0,15)+'...'}>
     <Grid 
       container
       justifyContent='center'
       sx={{marginTop: 2}}           
     >
      <Grid item xs={12} sm={8} md={6}>
         <Card>
          <CardHeader
            title={`Entrada: ${inputValue.substring(0,25)+'...'}`}
            subheader={`Creada  ${getformatDistaceToNow(Number(entry.createdAt))}`}
            />
            <CardContent>
              <TextField
                sx={{marginTop: 2, marginBottom:1}}  
                fullWidth
                placeholder='Nueva entrada'
                autoFocus
                multiline
                label='Nueva entrada' 
                value={inputValue} 
                onBlur={()=>setTouched(true)}
                onChange={onTextfieldChanged} 
                helperText={isNotValid &&'Ingrese un valor'} 
                error={isNotValid}        
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup
                    row
                    value={ status }
                    onChange={ onStatusChanged }
                >
                  {
                    ValidStatus.map( status => (
                      <FormControlLabel
                        key={status}
                        value={status}
                        control={<Radio/>}
                        label={capitalize(status)}
                      />
                    ))
                    
                  }
                </RadioGroup>
                </FormControl>
            </CardContent>

            <CardActions>
              <Button
              startIcon={<SaveOutlinedIcon/>}
              variant='contained'
              fullWidth
              onClick={ onSave }
              disabled={inputValue.length <= 0}
              >
                Guardar
              </Button>
            </CardActions>
          </Card>    
      </Grid>

     </Grid>
          <IconButton 
           sx={{            
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: 'error.dark'
           }}
           onClick={onDelete}
           >
            <DeleteOutlinedIcon/>
          </IconButton>

    </Layout>
  )
}




// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const { id } = params as {id: string}
  
 const entry = await dbEntries.getEntryById(id)

  if(!entry){
    return {
      redirect:{
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
     entry
      
    }
  }
}

export default EntryPage