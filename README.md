Hello! Welcome to 

# a poem for you

an interactive web experience that brings together your thoughts with that of poems from the Poetry Foundation, as well as images from Unsplash.
This came to be for Project 1: Poetic, Uncertain in DES INV 23 in Spring 2026.

**Disclaimer: ChatGPT models were used to write JS in this project, but I wrote all of the HTML and CSS myself

View documentation here: https://docs.google.com/document/d/15n91mf3p64zIjePrtl6igUu4tbFbJKyi2jGnabH3P3w/edit?usp=sharing

## To use:

1. git clone the repo
   
### 2. Register for Unsplash API

2a. Sign up as a developer at https://unsplash.com/developers <br>
2b. Navigate to Developers/API < Your apps <br>
2c. Create a new application and complete all forms. The application should immediately be approved for demo mode and will grant you 50 requests per hour. <br>
    **Note: one iteration of this program uses 7 requests <br>
2d. Copy the access key and paste it into line 162 of script.js: const UNSPLASH_KEY = "YOUR_ACCESS_KEY";

### 3. Running the program

3a. Open terminal (if not already open) <br>
3b. Install python3 on the device (if not already) <br>
3c. Paste this into the terminal: python3 -m http.server 8000 <br>

4. In a browser, visit http://localhost:8000/

5. Click on the text box in the center and edit the text

6. Click "give me a poem!" to generate a poem and a collage based on your input

## Thank you for visiting! I hope to someday return to this some day when I actually know JS and can code the logic on my own-- there are some bugs here and there that wil be put off for future me :)
