# student-management-system
Commands to start the Server:-
    * npm i (Download the node modules files)
    * npm start (To start the server) 
    
There are three types of profiles for accessing data:-
1) Admin :-     
                * For adding teachers , students , classes 
                * Creating Login credentials for students and teacher
                * Assigning teacher to a respective class
                * Assigning students to a respective class
2) Teacher:-    
                * Seeing all the students in the respective class
                * Adding marks of students
                * Seeing raking table of all the students in the respective class
3) Student:-
                * Seeing the respective scorecard and percentage

Routes:-
    Admin Routes:-

        1) POST /admin/teacher  Adding a Teacher
        2) DELETE /admin/teacher/:teacherId  Delete a Teacher
        3) GET /admin/allteachers Displaying all Teachers
        4) POST /admin/student  Adding a Student
        5) DELETE /admin/student/:studentId  Delete a Student
        6) GET /admin/allstudents Displaying all Students
        7) POST /admin/class  Adding a Class
        8) POST /admin/teacher/:teacherId/class/:classId Mapping teacher to a class
        9)POST /admin/student/:studentId/class/:classId Mapping Student to a class
    
    Authentication Routes:-
        
        1) POST /auth/teacher/login  Authentication of teacher(Login)
        2) POST /auth/student/login  Authentication of student(Login)
        3) POST /auth/admin/login  Authentication of admin(Login)

    Student Routes:-

        1) GET /student/:studentId  Displaying respective student report card

    Teacher Routes:-
    
        1) GET /teacher/:teacherId/allstudents Displaying all students (sorted)
        2) GET /teacher/:teacherId/ranking Displaying all students based percentage ranking
        3) POST /teacher/:teacherId/student/:studentId/make/report Adding particular subject marks to the respective student
