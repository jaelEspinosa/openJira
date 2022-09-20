
interface SeedData{
    entries:SeedEntry[];
}


interface SeedEntry {
    description : string,
    status: string,
    createdAt: number
}




export const SeedData: SeedData = {
    entries:[
        {
            
            description: 'Pendiente: Lorem fistrum de la pradera duodenal',
            status:'pending',
            createdAt: Date.now()
        },
        {
            
            description: 'In-progress: Lorem fistrum de la pradera duodenal',
            status:'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            
            description: 'finished: Lorem fistrum de la pradera duodenal',
            status:'finished',
            createdAt: Date.now() - 100000
        },
    ]
}