import React from 'react'
import { LoaderIcon } from 'lucide-react'
import {DotLottieReact} from  "@lottiefiles/dotlottie-react";

const Loading = () => {
  return (<div className="absolute z-100 inset-0 flex items-center bg-background justify-center">
          <DotLottieReact 
            src='/loading.lottie'
            loop
            autoplay
            style={{
              width: "100px",
              height: "100px",
             }}
          />
    </div>
  )
}

export default Loading
