import {Accordion, Button} from "shadcn-fe-components"

interface infoProps {

}

export function Info({}:infoProps){
return (
 <div 
//  style={{width:"100%", height:"100%" ,backgroundColor:"red"}}
 className='w-full h-full flex items-center justify-center bg-purple-400'>
    <Button className="bg-red-800">hello</Button>
 </div>
);
}
