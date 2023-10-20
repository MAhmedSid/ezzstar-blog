import { memo } from "react";
import Ad300x250 from "./Ad300x250";

 function Ad728x90({showMob}:{showMob:boolean}) {
   
        return (
            <>
                <iframe src="//g9qnk89pd5ic.com/watchnew?key=852c1aa193452e0068b63d26ef4eeb8c" width="728" height="90" scrolling="no" className="hidden tablet:flex overflow-hidden" ></iframe>
                {showMob && 
                <div className="tablet:hidden">
                <Ad300x250/>
                </div>
                }
            </>
        
    )
}

export default memo(Ad728x90);