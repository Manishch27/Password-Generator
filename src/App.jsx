import React, { useCallback, useRef, useState } from 'react'

const App = () => {
    const [length, setLength] = useState(8)
    const [Password, setPassword] = useState("Click to generate password");
    const [Numbers, setNumbers] = useState(true);
    const [specialCharacters, setSpecialCharacters] = useState(true);
    const [Btn, setBtn] = useState("Copy");

    const passwordLength = (e)=>{
        setLength(e.target.value);
    }

    const generatePassword = useCallback(()=>{
    let char = "";
    let pass = "";

        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if(Numbers){
            characters += "1234567890";
        }

        if(specialCharacters){
            characters+="!@#$%^&*()_+~`|}{[]:;?><,./-=";
        }

        for(let i = 0; i<length; i++){
            char = Math.floor(Math.random()*characters.length+1);
            pass += characters.charAt(char)
        }
        setPassword(pass);
    },[length, Numbers, specialCharacters])

    const passwordRef = useRef(null);

    const copyText = useCallback(()=>{
        passwordRef?.current?.select();
        window.navigator.clipboard.writeText(`${Password}`);
        setBtn("Copied");

        setTimeout(()=> setBtn("Copy"), 500);
    },[Password]);

  return(
    <div className='w-full h-full flex flex-col items-center'>
        <h1 className="text-center mt-4 mb-24 text-2xl font-bold"> Password Generator </h1>

        <div className='bg-[#A076F9] w-1/2 rounded-xl'>
            <div className= "m-6 flex items-center">
            <input type="text" name="password" id="password" value={Password} className='outline-none p-4 w-full rounded-s-lg' readOnly ref={passwordRef}/>
            <button className="px-8 py-4 bg-[#6528F7] rounded-e-lg text-white text-md font-[roboto] font-bold text-center tracking-wide active:bg-[#4D2DB7]" onClick={()=>copyText()}>{Btn}</button>
            </div>

            <div className='m-6 flex items-center gap-12 text-white font-[roboto]'>
                <div className='flex items-center gap-2'>
                <input type="range" name="length" id="length" min = {8} max={32} value={length} onChange={passwordLength}/>
                <label htmlFor="length">Length : {length}</label>
                </div>

                <div className='flex gap-2'>
                <input type="checkbox" name="numbers" id="numbers" checked={Numbers} onChange={()=>setNumbers((prev)=>!prev)} className='cursor-pointer'/>
                <label htmlFor="numbers" className='cursor-pointer'>Numbers</label>
                </div>

                <div className='flex gap-2'>
                <input type="checkbox" name="specialChar" id="specialChar" checked = {specialCharacters} onChange={()=>setSpecialCharacters((prev)=>!prev)}className='cursor-pointer'/>
                <label htmlFor="specialChar" className='cursor-pointer'>Special Characters</label>
                </div>

            </div>
        </div>

        <button className='mt-16 bg-[#6528F7] px-8 py-4 rounded-lg text-white font-[roboto] font-bold active:bg-[#4D2DB7]' onClick={()=>generatePassword()}>Generate</button>
    </div>
  )
}

export default App