import axios from "axios"
import { PUBLIC_FACT_API } from "../utils/constant"
import { useState } from "react"
import Spinner from "./Spinner"

const Home = () => {

    const [fact, setFact] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchFact = async () => {
        try {
            setLoading(true)
            const data = await axios.get(PUBLIC_FACT_API + "/fact");
            const fact = data.data?.fact

            setFact(fact)
            setError("")
        }
        catch (err) {
            setError(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-purple-200 to-blue-100">
            {fact && (
                <div className="w-[90%] min-h-[100px] bg-white/30 backdrop-blur-2xl rounded-xl p-6 shadow-lg">
                    <p className="text-lg text-black font-medium">
                        {fact}
                    </p>
                </div>
            )}
            <div>
                {error && <p className="text-red-500">{error}</p>}
                <button disabled={loading} onClick={fetchFact} className="btn btn-outline border-black text-black hover:text-white">{loading ? <Spinner /> :  "Get Fact" }</button>
            </div>
        </div>
    )
}


export default Home