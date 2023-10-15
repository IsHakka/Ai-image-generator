import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import defaultImage from '../Assets/default_image.svg';

const ImageGenerator = () => {

    // 添加圖片網址
    const [image, setImage] = useState('/');
    // 進度條狀態
    const [loading, setLoading] = useState(false);
    // 輸入敘述文字
    let inputRef = useRef();

    const imageGenerator = async () => {
        if (inputRef.current.value === '') {
            return 0
        }
        setLoading(true);
        const res = await fetch(
            'https://api.openai.com/v1/images/generations',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer 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",
                    "User-Agent": "Chrome",
                },
                body: JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n: 1,
                    size: "512x512",
                })

            }
        );
        let data = await res.json();
        // console.log(data);
        let data_array = data.data;
        setImage(data_array[0].url);
        setLoading(false);
    }
    return (
        <div className='AiImage'>
            <div className='Header'>
                Ai image
                <span> generator</span>
            </div>
            <div className="ImgLoading">
                <div className="image"><img src={image === '/' ? defaultImage : image} alt="default-image" /></div>
                <div className="Loading">
                    <div className={loading ? "LoadingBarFull" : "LoadingBar"}></div>
                    <div className={loading ? "LoadingText" : "DisplayNone"}>Loading...</div>
                </div>
            </div>
            <div className="SearchBox">
                <input type="text" ref={inputRef} className='SearchInput' placeholder='為想要生成的圖片進行敘述' />
                <button className='GenerateBtn' onClick={() => { imageGenerator() }}>生成</button>
            </div>
        </div>
    );
};

export default ImageGenerator;