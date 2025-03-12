async function addNewCookies(player_id, game_id) {
    try {
        const response = await fetch("http://localhost:3003/new_user", {
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

export { addNewCookies }