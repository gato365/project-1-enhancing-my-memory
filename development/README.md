# project-1-enhancing-my-memory

Purpose: I am in the process of becoming better developer, computer scientist, and data scientist. I am using this project to my ability to organize my thoughts and ideas. I am also using this project to practice my skills in writing and presenting my ideas to ChatGPT and other things.


## Future Design & Functionality Ideas:
 

### My Ideas based on what I want to enhance:

#### Current Version:





##### Level 1:


* [X] Use this for e numbers Process for only 40 e numbers (1 set) - Multiple Steps

    - [X] The *User* **selects** a letters from a dropdown menu with options {A-F}.
    - [X] The *User* **clicks** a "Continue" button.
    - [X] The *User* **selects** either "Just 1 Set" or "All of the Sets" from a dropdown menu, with "Just 1 Set" as the default option.
    - [X] If the *User* **selects** "Just 1 Set", they will be prompted to select a set from another dropdown menu with options 1-5.
    - [X] The *User* **clicks** a "Let's Start" button to proceed.
    - [X] The *User* is then presented with:
    - [X] A text display above the input text box that shows the selected group and set, formatted as "Group: [selected group], Set: [selected set]".
    - [X] An input text box for the *User* to enter the text corresponding to the selected group and set.
* [X] Save scores in a database


## Today
* [ ] Create a score board (show best times and scores for specific groups and sets)
    [ ] Use data from mongoDB to create a score board
* [ ] Display in red what is wrong with my answer versus what the correct answer is



## New version
* [ ] Use this for e numbers Process for an entire group (A-F)
    * [ ] Keep Time for entire set 
    * [ ] Keep time for each line
* [ ] Perform unit testing
* [ ] Create a visualization of past scores
* [ ] Give the ability to set a time goal
    * [ ] If goal is not met, take points off
    
 #### In a future version:
* [ ] Use this for music chords  Process
* [ ] Create user accounts

project-1-enhancing-my-memory/
├── node_modules/
├── public/
│   ├── index.html
│   ├── app.js
│   ├── eman.json 
│   └── style.css 
├── server/
│   ├── models/
│   │   └── Score.js
│   |   └── index.js
│   ├── controllers/
│   │   └── scoreController.js
│   ├── routes/
│   │   └── api.js
|   |        └── index.js
|   |        └── scoreRoutes.js
│   │   └── index.js
│   ├── server.js
│   └── connection/
|            └── config.js
├── package.json
└── package-lock.json