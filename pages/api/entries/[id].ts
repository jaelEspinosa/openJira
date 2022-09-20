import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';




type Data = 
|{message: string}
|IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    const{id} = req.query


    if (!mongoose.isValidObjectId( id )){
        return res.status(400).json({message : 'El ID no es válido, ' + id})
    }

    switch(req.method){
        case 'PUT':
            return updateEntry(req, res);
        case 'GET':
                return getEntry(req, res);
        case 'DELETE':
                return deleteEntry(req, res);
        default:
            return res.status(400).json({message : 'Método no válido'})
  
    }

   
}
const getEntry = async (req:NextApiRequest, res:NextApiResponse<Data>)=>{

    const{id}=req.query

    await db.connect()

    const entryToFind = await Entry.findById(id)

    if(!entryToFind) {
        await db.disconnect()
        return res.status(400).json({message:'No existe ninguna entrada con ese ID' + id})
    }

    try {
        return res.status(200).json(entryToFind)
    } catch (error:any) {
        await db.disconnect()
        res.status(400).json({message:error.errors.status.message}) 
    }
}

const deleteEntry = async (req:NextApiRequest, res:NextApiResponse<Data>)=>{
    const{id}=req.query

    await db.connect()

    const entryToDelete = await Entry.findById(id)

    if(!entryToDelete){
        await db.disconnect()
        return res.status(400).json({message:'No existe ninguna entrada con ese ID' + id})
    }
    try {
        await Entry.findByIdAndDelete(id)
        res.status(200).json({message:'Entrada borrada con éxito'})
    } catch (error:any) {
        await db.disconnect()
        res.status(400).json({message:error.errors.status.message})  
    }
}



const updateEntry =async (req: NextApiRequest,res:NextApiResponse<Data>) => {
    const {id} = req.query

    await db.connect()

    const entryToUpdate = await Entry.findById(id)

    if(!entryToUpdate){
        await db.disconnect()
        return res.status(400).json({message:'No existe ninguna entrada con ese ID' + id})
    }
   const{
    description = entryToUpdate.description,
    status = entryToUpdate.status
   } = req.body


 try {
  const uptatedEntry = await Entry.findByIdAndUpdate(id, {description, status},{runValidators:true, new:true}) 
  await db.disconnect()
  res.status(200).json(uptatedEntry!)
  
  // otra forma de hacerlo seria:

  // entryToUpdate.description = description;
  // entryToUptate.status = status;
  // await entryToUpdate.save()

    
 } catch (error: any) {
  
  await db.disconnect()
  res.status(400).json({message:error.errors.status.message})
 }

}