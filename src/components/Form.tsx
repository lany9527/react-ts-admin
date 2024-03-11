import { useState } from "react"

export default function form() {
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('typing')
  return(
    <>
      <h1>请填写正确答案</h1>
      <p>3*8等于多少</p>
      <form>
        <input value={answer} />
      </form>
    </>
  )
}