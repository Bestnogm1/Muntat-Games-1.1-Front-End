import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import styles from './LobbyList.module.css'
const LobbyList = ({ lobby, handleDeleteLobbies, user, handleJoin, setLobby, chooseRandomBackgroundImage }) => {
	let players = lobby.waitingPlayers.map(player => player._id)
	return (
		<div className={styles.container} style={{ backgroundImage: `url(${chooseRandomBackgroundImage()})` }}>
			<div className={styles.lobby_info}>
				<p className={styles.lobby_owner}>A Lobby By {lobby.owner.name}</p>
				<span><h3>{lobby?.game?.name}</h3></span>
				<span>Lobby Name: {lobby?.name}</span>
			</div>
			{(lobby.owner._id && lobby?.owner?._id === user?.profile) ? (
				<div className={styles.buttonContainer}>
					<>
						<button
							onClick={() => handleDeleteLobbies(lobby._id)}
							className={styles.delete}>
							Delete
						</button>
						<Link to="/edit-lobby" state={lobby}>
							<button className={styles.update}>Update</button>
						</Link>
					</>
					<Link to={`/lobby-detail/${lobby._id}`} state={lobby}>
						<button
							className={styles.join}
						>View</button>
					</Link>
				</div>
			) : (
				<>
					{players?.includes(user?.profile?.toString()) ? (
						<div className={styles.buttonContainer}>
							<Link to={`/lobby-detail/${lobby._id}`} state={lobby}>
								<button>View</button>
							</Link>
						</div>

					) : (
						<div className={styles.buttonContainer}>
							<Link to={`/lobby-detail/${lobby?._id}`} state={lobby}>
								<button onClick={() => handleJoin(lobby?._id)}>Join</button>
							</Link>
						</div>
					)
					}
				</>
			)}
			<div className={styles.players}>
				<p>Lobby Capacity</p>
				<p>10 / 90</p>
			</div>
		</div>
	);
}

export default LobbyList