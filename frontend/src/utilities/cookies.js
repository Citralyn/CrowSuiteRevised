async function getGameState() {
    try {
      const response = await fetch("https://crowsuiterevised.onrender.com/get_game_state", {
        credentials: "include"
      });

      if (response.ok) {
        const data = await response.text(); 
        console.log(`State is ${data}`); 
        return data; 
      }

    } catch(error) {
      console.log(error.message); 
    }
}

async function setGameState(gamestate) {
    try {
        const response = await fetch("https://crowsuiterevised.onrender.com/set_game_state", {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({gamestate: gamestate})
        })

        if (response.ok) {
            const data = await response.text();  
            console.log(`RESPONSE FROM API: ${data}`); 
        }

    } catch (error) {
      console.log(error.message); 
    }
}

async function addNewCookies(player_id, game_id) {
    try {
        const response = await fetch("https://crowsuiterevised.onrender.com/new_user", {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ player_id: player_id, game_id: game_id})
        })

        if (response.ok) {
            const data = await response.text();  
            console.log(`RESPONSE FROM API: ${data}`); 
        }

    } catch (error) {
      console.log(error.message); 
    }
}

async function getGameID() {
    try {
      const response = await fetch("https://crowsuiterevised.onrender.com/get_game_id", {
        credentials: "include"
      });

      if (response.ok) {
        const data = await response.text(); 
        console.log(`Game ID is ${data}`); 
        return data; 
      }

    } catch(error) {
      console.log(error.message); 
    }
}

async function getPlayerID() {
    try {
      const response = await fetch("https://crowsuiterevised.onrender.com/get_player_id", {
        credentials: "include"
      });

      if (response.ok) {
        const data = await response.text(); 
        console.log(`Player ID is ${data}`); 
        return data; 
      }

    } catch(error) {
      console.log(error.message); 
    }
}

export { addNewCookies, getGameState, setGameState, getGameID, getPlayerID }