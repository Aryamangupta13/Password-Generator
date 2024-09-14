import { useCallback, useEffect, useMemo, useState ,useRef} from "react";
import "./App.css";
let s = 55;

function App() {
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");

  const passwordref=useRef(null)
  
  const password_generator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxys";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (characterAllowed) {
      str += "!@#$%^&*_-";
    }
    let temp_password = "";
    for (let i = 0; i < length; ++i) {
      let index = Math.floor(Math.random() * str.length);

      temp_password += str.charAt(index);
    }

    setPassword(temp_password);
    //here setpasword is given in dependencies because of making int memoize
  }, [numberAllowed, characterAllowed, length, setPassword]);

  const copytoclipbord=()=>{
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  useEffect(()=>{
    password_generator();
  },[password_generator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordref}
          />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-900 active:bg-blue-950" onClick={copytoclipbord}>
            copy
          </button>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={()=> setNumberAllowed((prev)=>!prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={()=> setCharacterAllowed((prev)=>!prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
