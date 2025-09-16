import { useState } from "react"
import { useAuth } from "../Context/AuthContex"
import { useNavigate, Navigate } from "react-router-dom";




export default function Login(){
 const [ credentials, setCredentials] = useState({
    username:'',
    password: ''
 });

 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const {login, isAuthenticated} = useAuth();
 const navigate = useNavigate();

 if(isAuthenticated){
    return <Navigate to='/dashboard' replace/>
 }

 const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true)
    setError('')

     const result = await login(credentials);

     if(result.success){
        navigate('/dashboard')
     }
     else{
        setError(result.error || 'login fallito')
     }

     setLoading(false)
 };

 const handleChange= (e) =>{
    setCredentials({
        ...credentials,
        [e.target.name] : e.target.value
    })
 }


 return(
  <div className="w-full min-h-screen flex items-center justify-center relative">
  {/* Gradiente di sfondo */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#8E54E9] to-[#4776E6]"></div>

  {/* Overlay glassmorphism */}
  <div className="relative bg-white/20 backdrop-blur-md  max-w-lg w-full py-5 mx-4 rounded-2xl shadow-xl z-10 md:py-10 md:px-10">
    <h1 className="text-2xl font-bold mb-4 text-center text-white md:text-3xl">
      Accedi al tuo account
    </h1>
    <p className="font-semibold text-md text-center text-gray-200 mb-6 md:text-lg md:mb-10">
      Utilizza le credenziali 'admin'
    </p>

    <div className="px-6 text-base">
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="text-center text-red-500 text-base">{error}</div>
        )}

        <div className="mb-4">
          <label className="font-semibold text-white md:text-lg">Username:</label>
          <input
            type="text"
            id="name"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="inserisci il tuo nome utente"
            className="w-full px-2 py-2 my-2 rounded-xl border border-white/30 text-black  focus:border-white/30 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold text-white md:text-lg">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={credentials.password}
            onChange={handleChange}
            placeholder="inserisci password"
            className="w-full px-2 py-2 my-2 rounded-xl border border-white/30 text-black focus:border-white/30 focus:outline-none "
          />
        </div>

        <div className="text-center mt-5">
          <button
            disabled={loading}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold"
          >
            {loading ? "Attendi..." : "Accedi"}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>


 )







    
}