import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import '../assets/style/LoginSignup.scss'
// Sử dụng biến môi trường
const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000'

const LoginSignup = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')
  const [formValues, setFormValues] = useState({ email: '', password: '', confirmPassword: '' })


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formValues;

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match!')
      return;
    }

    try {
      const url = isLogin ? '/api/account/login' : '/api/account/register'
      const res = await axios.post(`${baseUrl}${url}`, { email, password })
      if (isLogin && res.status === 200) {
        localStorage.setItem('token', res.data.token)
        if (res.data.role === 1) {
          navigate('/admin')
        } else {
          navigate('/user')
        }
      }
      else if (!isLogin && res.status === 201) {
        toast.success(res.data.success)
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(isLogin ? 'Login failed' : 'Register failed');
      }
    }
    setFormValues({ email: '', password: '', confirmPassword: '' })
  }


  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormValues({ email: '', password: '', confirmPassword: '' })

  };

  return (
    <div className='login-signup'>
      <div className='form__container'>
        <h2>{isLogin ? 'Welcome to the personal record management system that supports medical examination and treatment' : 'Register an account'}</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis alias harum ipsam labore numquam vitae ullam incidunt voluptatum, nisi, consequatur assumenda totam ab magni omnis distinctio, vero corrupti possimus facilis!</p>
        <form onSubmit={handelSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              name='email'
              type="email"
              className="form-control"
              id="email"
              onChange={handleChange}
              required
              value={formValues.email} />

            <div className="form-text">{!isLogin ? "We'll never share your email with anyone else." : ''}</div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              name='password'
              type="password"
              className="form-control"
              id="password"
              onChange={handleChange}
              required
              value={formValues.password} />
          </div>

          {isLogin && (
            <>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"  />
                <label className="form-check-label" htmlFor="exampleCheck1">Remember password</label>
              </div>
            </>
          )}
        
          {!isLogin && (
            <>
              <div className="mb-3">
                <label htmlFor="confirm__password" className="form-label">Comfirm your password</label>
                <input
                  name='confirmPassword'
                  type="password"
                  className="form-control"
                  id="confirm__password"
                  onChange={handleChange}
                  required
                  value={formValues.confirmPassword} />

                <p className='mt-2 error'>{error}</p>
              </div>

              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
                <label className="form-check-label" htmlFor="exampleCheck1">By creating an account, I agree to our Terms of use and
                  Privacy Policy </label>
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary mb-3">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <p> {isLogin ? "Don't have an account? " : 'Already have an account? '} <a className='' onClick={handleToggle} href="#">{isLogin ? 'Sign Up' : 'Login'}</a> </p>
      </div>
      <ToastContainer />

    </div>
  )
}

export default LoginSignup
