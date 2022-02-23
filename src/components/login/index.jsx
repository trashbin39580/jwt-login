import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import axios from 'axios'
import {CircularProgress} from '@mui/material'

const Signup = () => {

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [isLoading, setIsdLoading] = useState(false)

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsdLoading(true)
            const URL = "https://aymane-jwt-auth.herokuapp.com/api/auth/";
            const {data: res} = await axios.post(URL, data);
            localStorage.setItem("token", res.data);
            window.location = '/';
        } catch (error) {
            if(error.response && (error.response.status >= 400 && error.response.status <= 500)){
                setError(error.response.data.message)
                setIsdLoading(false)
            }
        }
    };

    return (
    <div className={styles.login_container}>
        <div className={styles.login_form_container}>
            <div className={styles.left}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h1>Login to your account</h1>
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
                        {isLoading ? <CircularProgress style={{color: 'white'}}/> : 'Sign up' }
                    </button>
                </form>
            </div>
            <div className={styles.right}>
                <h1>New Here ?</h1>
                <Link to="/signup">
                    <button type='button' className={styles.white_btn}>
                        Sign Up
                    </button>
                </Link>
            </div>
        </div>
    </div>
    );
}

export default Signup;