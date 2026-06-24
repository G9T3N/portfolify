import { Fullscreen } from "lucide-react";
import { CardStack } from "../core/CardStack"
import { StackableItem } from "../types";
import lanyardImage from '@/assets/lanyard/lanyard.jpg'
import {motion} from "framer-motion"
interface ImageCard extends StackableItem {
    img: string;
    
    }
export function ImageCardStack(){
    const items:ImageCard[]=[
        {id:1,img:"/favicon.svg"},
        {id:2,img:lanyardImage},
     
    ]
    return (
        <CardStack items={items}>

            {(card)=>(
            
            <div className="relative w-full! rounded-4xl p-4 border shadow-2xl overflow-hidden flex flex-col h-[42vh] bg-card border-border">
 <div className="flex items-center w-full justify-between mb-4 ">
                        <span className="mp-label-caps text-muted-foreground"></span>
                        <div className="flex gap-2">
                          <div className="w-2 h-2 rounded-4xl bg-border" />
                          <div className="w-2 h-2 rounded-4xl bg-border" />
                          <div className="w-2 h-2 rounded-4xl bg-primary" />
                        </div>
                      </div>

                      <div className="flex-grow rounded-4xl overflow-hidden relative">
                        <div className="w-full h-full flex items-center justify-center">
                        <img src={card.img} alt="card"  className="pointer-events-none size-42 rounded-2xl object-cover" />

                        </div>
                        <div className="absolute inset-0 border rounded-4xl pointer-events-none border-border" />
                      </div>
                      <div className="mt-4 px-2 flex justify-between items-center mp-label-mono">
                        <span className="text-muted-foreground">Mr.Err</span>
                        <span className="text-primary"><Fullscreen /></span>
                      </div>
           
                     
                
           </div>

        )

            }
        </CardStack >
    )
}