// import React,{useRef,useState} from 'react'
// import './ImageGenerator.css'
// import default_img from '../Assets/default_img.svg'
// const ImageGenerator = () => {
//     const [image_url,setImage_url]=useState("/");
//     let inputRef=  useRef(null);
//     const [loading,setLoading]= useState(false);
//     const imageGenerator = async () => {
//         if(inputRef.current.value==="")
//         {
//             return 0;
//         }
//         setLoading(true);
//         const response= await fetch(
//             "https://api.openai.com/v1/images/generations",
//             {
//                 method:"POST",
//                 headers:{
//                     "Content-Type":"application/json",
//                     Authorization:
//                     "Bearer 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",
//                     "User-Agent":"Chrome",
//                 },
//                 body:JSON.stringify({
//                     prompt:`${inputRef.current.value}`,
//                     n:1,
//                     size:"512x512",
//                 }),
//             }

//         );
//         let data = await response.json();
// console.log(data); // Log the entire response data to the console
// let data_array = data.data;
// console.log(data_array); // Log the data_array to the console
// setImage_url(data_array[0].url);
// setLoading(false);



//      }
//   return (
//     <div className='ai-image-generator'>
//         <div className="header">Ai image<span>generator</span></div>
//         <div className="img-loading">
//             <div className="image"><img src={image_url==="/"?default_img:image_url} alt=""/></div>
//             <div className="loading">
//                 <div className={loading?"loading-bar-full":"loading-bar"}></div>
//                 <div className={loading?"loading-text":"display-none"}>Loading...</div>
//             </div>
//         </div>

    
//     <div className="search-box">
//         <input type="text" ref={inputRef} className='search-input'  placeholder="Describe What youwant to see"/>
//         <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
//     </div>
//     </div>
//   )
// }
// export default ImageGenerator




import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_img from '../Assets/default_img.svg';

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState('/');
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const imageGenerator = async () => {
        if (inputRef.current.value === '') {
            return 0;
        }
        setLoading(true);

        try {
            const response = await fetch(
                'https://api.openai.com/v1/images/generations',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer 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',
                            //'Bearer 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',
                        'User-Agent': 'Chrome',
                    },
                    body: JSON.stringify({
                        prompt: `${inputRef.current.value}`,
                        n: 1,
                        size: '512x512',
                    }),
                }
            );

            const responseData = await response.json();
            console.log('Response data:', responseData);

            // Check if response has an error property
            if (responseData.error) {
                console.error('API Error:', responseData.error);
                setLoading(false);
                return;
            }

            // Check if responseData contains the expected property
            if (responseData.data && Array.isArray(responseData.data)) {
                let data_array = responseData.data;
                console.log('Data array:', data_array);

                // Check if data_array has elements before accessing [0]
                if (data_array.length > 0) {
                    setImage_url(data_array[0].url);
                } else {
                    console.error('Data array is empty.');
                }
            } else {
                console.error('Unexpected response structure:', responseData);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    return (
        <div className="ai-image-generator">
           
        <div className="header">Ai image<span>generator</span></div>
        <div className="img-loading">
            <div className="image"><img src={image_url==="/"?default_img:image_url} alt=""/></div>
            <div className="loading">
                <div className={loading?"loading-bar-full":"loading-bar"}></div>
                 <div className={loading?"loading-text":"display-none"}>Loading...</div>
            </div>
        </div>

    
    <div className="search-box">
        <input type="text" ref={inputRef} className='search-input'  placeholder="Describe What youwant to see"/>
         <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
    </div>
    </div>
        
    );
};

export default ImageGenerator;
