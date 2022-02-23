import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import axios from 'axios'

const Signup = () => {

    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const URL = "http://localhost:8080/api/users/";
            const {data: res} = await axios.post(URL, data);
            navigate('/login');
            console.log(res.message)
        } catch (error) {
            if(error.response && (error.response.status >= 400 && error.response.status <= 500)){
                setError(error.response.data.message)
            }
        }
    };

    return (
    <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
            <div className={styles.left}>
                <h1>Welcome back</h1>
                <Link to="/login">
                    <button type='button' className={styles.white_btn}>
                        Sign in 
                    </button>
                </Link>
            </div>
            <div className={styles.right}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h1>Create an account</h1>
                    <input 
                        type='text'
                        placeholder='Username'
                        name='username'
                        value={data.username}
                        required
                        className={styles.input}
                        onChange={(e) => setData({...data, username: e.target.value})}
                    />
                    <input 
                        type='text'
                        placeholder='Email'
                        name='email'
                        value={data.email}
                        required
                        className={styles.input}
                        onChange={(e) => setData({...data, email: e.target.value})}
                    />
                    <input 
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={data.password}
                        required
                        className={styles.input}
                        onChange={(e) => setData({...data, password: e.target.value})}
                    />
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button type='submit' className={styles.green_btn}>
                        Signup
                    </button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default Signup;