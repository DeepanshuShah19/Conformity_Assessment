# Conformity_Assessment
Step1: Open the main folder after cloning the code<br/>
Step2: Now you will be able to see 2 folders named conformality_backend and conformality_frontend which holds the respective code<br/>
Step3: Open both of these folders in seperate terminals<br/>
Step4: In conformality_backend terminal run the node script but typing command "node app.js"<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NOTE: Please wait for 2 messages after running the node script. Console will say<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Server is running on port 4000<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Connected To MongoDB database"<br/>
Step5: Once you see the message of connected to database, open conformality_frontend terminal and run the react project<br/>
Step6: Run react project by typing command "npm start"<br/>

NOTE: The api's are configured to run on port number 4000. If this port is already occupied by some system on your machine,you can change it to any available ports, you will have to change it at 2 places.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. At conformality_backend/app.js ot line 11<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. At conformality_frontend/src/Utils/apiCalls.js at line 2 (Change only the number after "http://localhost:")
