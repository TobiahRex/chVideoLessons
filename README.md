# _Video Lesson App_:  Full-Stack REACT & Redux App
## _Coding House's own Pluralsight & Reddit_
<!-- ### Deployed on Heroku [here](https://itiner-ez.herokuapp.com/). -->

##### Started: 16 August 2016

#### DESCRIPTION: Full Stack Video Streaming App for Students.  Designed for students to watch curriculum videos and interact with the video by asking questions, make comments, add replies, upvote and downvote comments and replies as they're watching the video.  Students will also have access to a notes document.  The video, video chapters, notes, and comments will all exist inside the same view.

#### TECHNOLOGIES:
* Vimeo API for Video hosting.
* React JS for Front end.
* React Redux for Front end state management.
* Passport Vimeo React package for Authentication.
* Mongo DB for Database Management.
* Node.js & Express.js for Backend Services.

#### Team:
* Nicholas James: Idea
* Rachael Wood: UI/UX Designer
* AJ Funk: Backend Designer
* Tobiah Rex: Application Builder

#### Accomplishments:
* August 29th:
  * React Boilerplate - SAT

* August 24rd:
<img src='http://i.imgur.com/QHGEq3Q.png' />
  * GET api/cl/:id - SAT (get specific cohort's lesson)
  * PUT api/cl/:id - SAT (update specific cohort's lesson)
  *
  * GET api/lessons/:id - SAT
  * DELETE api/lessons/:id - SAT
  * PUT api/lessons/:id - SAT
  * GET api/lessons/ - SAT
  * POST api/lessons/ - SAT (create New Lesson)
  <img src='http://i.imgur.com/qIKz2UE.png' />
    * This route takes an array of chapters,
    * array of sections,
    * notes document,
    * array of video urls,
    * a cohort id,
    * assigns all that data to a new lesson,
    * assigns that lesson to that specific cohort,
    * adds that lesson independently to the database.  

* August 22nd:
  * GET api/users/:id - SAT
  * GET api/users/ - SAT
  * POST api/login/ - SAT

#### Setup:
#####1) "npm install"
#####2) "npm start" for development server
#####3) "npm build" for production server
