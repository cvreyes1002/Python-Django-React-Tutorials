import useToggle from "./hooks/useToggle"

function Toggler() {
  const [isHappy, toggleIsHappy] = useToggle(true)
  const [isHeartbroken, toggleIsHeartbroken] = useToggle(false)
  const [isBanana, toggleIsBanana] = useToggle(true)

  return (
    <div>
      <h1 onClick={toggleIsHappy}>{isHappy ? "😀" : "😥"}</h1>
      <h1 onClick={toggleIsHeartbroken}>{isHeartbroken ? "💔" : "❤️"}</h1>
      <h1 onClick={toggleIsBanana}>{isBanana ? "🍌" : "🍎"}</h1>
    </div>
  )
}


/*
function Toggler() {
  const [isHappy, setIsHappy] = useState(true)
  const [isHeartbroken, setIsHeartbroken] = useState(false)

  const toggleIsHappy = () => setIsHappy(!isHappy)
  const toggleIsHeartbroken = () => setIsHeartbroken(!isHeartbroken)

  return (
    <div>
      <h1 onClick={toggleIsHappy}>{isHappy ? "😀" : "😥"}</h1>
      <h1 onClick={toggleIsHeartbroken}>{isHeartbroken ? "💔" : "❤️"}</h1>
    </div>
  )

  /////////////////////////////////////
  //  Using an inline Arrow Function
  ////////////////////////////////////
  // return (
  //   <h1 onClick={() => setIsHappy(!isHappy)}>{isHappy ? "😀" : "😥"}</h1>
  // )
}
*/

export default Toggler


  
