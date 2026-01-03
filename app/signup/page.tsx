import { createUser } from './actions'

const Signup = () => {
    return (
        <div>
            Sign Up
        <form action={createUser}>
        <input type='email' name='email' placeholder='Email'></input>
        <input type='password' name='password' placeholder='password'></input>
        <button>Submit</button>
        </form>
        </div>
    )
}

export default Signup
