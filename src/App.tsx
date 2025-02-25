
import './App.css'
import {useCallback, useEffect, useState} from "react";

function App() {

    const [password, setPassword] = useState<string>("")
    const [length, setLength] = useState<number>(8)
    const [isNumbersAllowed, setIsNumbersAllowed] = useState<boolean>(true);
    const [isSpecialCharacterAllowed, setIsSpecialCharacterAllowed] = useState<boolean>(false);

    const generatePassword = useCallback(() => {

        let pass = ""
        let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if(isNumbersAllowed){
            string += "0123456789";
        }
        if(isSpecialCharacterAllowed){
            string += "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
        }

        for (let i = 1; i <= length; i++){
            const char = Math.floor(Math.random() * string.length + 1);
            pass += string.charAt(char);
        }
        setPassword(pass)
    }, [length, isNumbersAllowed, isSpecialCharacterAllowed]);

    useEffect(() => {
        generatePassword();
    }, [length, isNumbersAllowed, isSpecialCharacterAllowed, generatePassword]);

  return(
      <div className="w-full h-screen">
          <div className="flex flex-col items-center pt-10">
              <h2 className="text-3xl font-bold mt-10 mb-6">Password Generator</h2>
              <input
                value={password}
                readOnly
                className="border-1 border-gray-500 rounded-lg w-96 p-2 text-lg font-normal"
              />
              <div className="flex flex-row items-center gap-4 my-6">
                  <label className="text-lg font-semibold">Length : {length} </label>
                  <input
                    type="range"
                    value={length}
                    onChange={(e) => {
                        setLength(parseInt(e.target.value))
                    }}
                    max={20}
                    min={6}
                    className="w-64"
                  />
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-row gap-1 items-center">
                      <input
                          checked={isNumbersAllowed}
                          type="checkbox"
                          onChange={(e) => setIsNumbersAllowed(e.target.checked)}
                      />
                      <label className="text-xl" htmlFor="isPasswordAllowed">Include numbers</label>
                  </div>
                  <div className="flex flex-row  gap-1 items-center">
                      <input
                          checked={isSpecialCharacterAllowed}
                          type="checkbox"
                          onChange={(e) => setIsSpecialCharacterAllowed(e.target.checked)}
                      />
                      <label className="text-xl" htmlFor="isPasswordAllowed">Include special characters</label>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default App
