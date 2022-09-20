import React from 'react'
import { FC, DragEvent, useContext } from 'react';
import { Entry } from '../../interfaces'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'

import { UIContext } from '../../context/ui';
import { useRouter } from 'next/router';

import { getformatDistaceToNow } from '../../utils/dateFuntion';

interface Props {
  entry : Entry
}

export const EntryCard:FC<Props> = ({entry}) => {
  const router = useRouter()

  const {startDragging, endDragging} = useContext(UIContext)

  const onDragStart = (event: DragEvent) =>{
  
     event.dataTransfer.setData('text', entry._id)

     startDragging()
  }

  const onDragEnd = ()=>{
    endDragging()
  }
  const goToEdit = ()=>{
    router.push(`/entries/${entry._id}`)
  }

  return (
    <div>
      <Card 
          sx={{ margin: 1, backgroundColor: '#131312e6'}}
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onClick={goToEdit}
      >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line'}}>{entry.description}</Typography>
        </CardContent>
        <CardActions sx={{displaly: 'flex', justifyContent:'end', paddingRight: 2}}>
          <Typography variant='body2' >{`Creada ${getformatDistaceToNow(Number(entry.createdAt))}`}</Typography>
        </CardActions>
        </CardActionArea>  
      </Card>

    </div>
  )
}
