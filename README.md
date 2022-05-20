[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7797938&assignment_repo_type=AssignmentRepo)
# Assignment2
 
## _URL:_
https://web-development-environments-2022.github.io/assignment2-207777525_318267895/
## _Our details:_ 
- Shiri Itach 318267895
- Noam Cohen Maguri 207777525


## _Functionality:_
- Welcome Page.
- Registration Page :  
Using jQuery and RegExp for validation check.
- Login Page :  
Check the users dictionary to see if the user exists and the password matches.
- Settings Page :  
Allows you to select settings for the game, such as the color of the food, the game keys and the number of ghosts. The game keys were selected using EventListener that listened to the keyboard according to the wanted direction. 
- About Page :  
A modal dialog that can be opened above each div, includes an animation for the title and contains details on patterns we used and difficulties we faced during the assignment.
- Game Page :  
Sets the food and pacman location randomly. The ghosts move towards the pacman, and when they meet the pacman loses life and the game continues. The game ends when Pacman's life is over, or time's over. The Pacman will win if he has gained over 100 points in time constraints and has not run out of life, otherwise he will lose.  
During the game elements like clock, candy, medicine and star pop up, each giving points, life or time.

  
## _Game Board:_
We created a game board in the shape of a maze that has no (dead ends). Each path in the maze is a narrow path for one character.
Each character had a different number so we could map the characters and draw them according to what the array of the board contained.
0 - blank
1 - Food that gives 5 points
2 - Food that gives 15 points
3 - Food that gives 25 points
4 - wall
5 - Pacman
6 - Pink ghost
7 - Blue Ghost
8 - Orange ghost
9 - Red ghost
10 - Clock (gives 20 seconds extra playing time)
11 - Candy in alternating colors that appears and disappears every 5 seconds (gives 30 points)
12 - Medication (gives extra life if they are under 5)
13 - Star Mario moves on the board (gives an extra 50 points)
