import styles from "./styles.module.css";

const Main = ({user}) => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>fakebook</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
            <main style={{padding: '3rem'}}>
                <h2>{user && `Welcome to Fakebook, Here's your info: `}</h2>
                {user &&
                    <ul>
                        <li style={{marginBottom: '1rem'}}>Username : {user.username}</li>
                        <li style={{marginBottom: '1rem'}}>Email : {user.email}</li>
                        <li style={{marginBottom: '1rem'}}>Password : {user.password}</li>
                    </ul>
                }
            </main>
		</div>
	);
};

export default Main;