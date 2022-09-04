# pokegame2

Requires Nodejs and git

1. clone repo into folder
2. cd into pokeclient and run npm install
3. cd into pokeserver and run npm install
4. create a .env.local file in the client directory containing  
   NEXT_PUBLIC_ROOT_URL="http:// YOUR IP :3000"  
   NEXT_PUBLIC_SERVER_URL="http:// YOUR IP :3001"
5. run client using npm run dev -- -H YOUR IP
6. run server using npm run dev -- -H YOUR IP
7. restart server on crash or change to players
