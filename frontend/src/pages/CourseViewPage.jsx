import { useState, useEffect, Fragment , useRef } from "react";
import ProgressManager from "../components/Progress/ProgressManager";
import CourseContent from "../components/CourseDetailsComp/CourseContent";
import NavBar from "../components/UI/NavBar/NavBar";
import ExamManager from "../components/Exam/ExamManager";
import NotesManager from "../components/Notes/NotesManager";
import axios from "axios";
import { useLocation } from "react-router-dom";
import WarningAlert from "../components/UI/WarningAlert";
import ContentCourseView from "../components/CourseView/ContentCourseView";

const CourseViewPage = () => {
  //will give the backend the id of the clicked course , then will fetch all the details about that course
  //to fill the subtitle accordion and create an onClick function to change the link of the video playing.
  //at the buttom of the video frame will have a notes trigger which will create a text box at the buttom
  //at the top below the navbar will have a div with the progress and view notes  and some extra controls..

  //this page will handle the viewed sources and solving exams and notes areas..
  const location = useLocation();
  const [receivedData, setReceivedData] = useState({});
  const [currentSource, setCurrentSource] = useState("");
  const [studentSolutions,setStudentSolutions] = useState([])
  const [showNextLessonAlert, setShowNextLessonAlert] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNotesFilter, setCurrentNotesFilter] = useState({
    id: 1,
    name: "All Lessons",
  });
  const [currentReportsFilter, setCurrentReportsFilter] = useState({
    id: 1,
    name: "Technical"
  });
  const [progress, setProgress] = useState(0);
  const [totalSources, setTotalSources] = useState(0);
  const managerRef = useRef(null);
  useEffect(() => {
    const courseId = location.state;
    const userid = "638a07cdbc3508481a2d7da9";
    if (currentNotesFilter.name === "All Lessons") {
      axios
        .get(`http://localhost:3000/user/coursenotes?cid=${courseId}` ,{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'content-type': 'text/json'
}})
        .then((res) => {
          var notesSet = [];
          for (var i = 0; i < res.data.noteData.length; i++) {
            if (res.data.noteData[i].notes.length !== 0) {
              for (var j = 0; j < res.data.noteData[i].notes.length; j++) {
                var temp = {
                  sourceId: res.data.noteData[i].sourceId,
                  note: res.data.noteData[i].notes[j].note,
                  timestamp: res.data.noteData[i].notes[j].timestamp,
                  sourceDescription: `${
                    res.data.noteData[i].sourceIndex + 1
                  }. ${res.data.noteData[i].sourceDescription}`,
                  subtitleDescription: `${
                    res.data.noteData[i].subtitleIndex + 1
                  }. ${res.data.noteData[i].subtitleDescription}`,
                };
                notesSet.push(temp);
              }
            } else {
              continue;
            }
          }

          setNotes(notesSet);
        });
    } else if (currentNotesFilter.name === "Current Section") {
      var subtitleId;
      for (var i = 0; i < receivedData.subtitles.length; i++) {
        for (var j = 0; j < receivedData.subtitles[i].sources.length; j++) {
          if (currentSource._id === receivedData.subtitles[i].sources[j]._id) {
            subtitleId = receivedData.subtitles[i]._id;
          }
        }
      }
      axios
        .get(
          `http://localhost:3000/user/subtitlenotes?cid=${courseId}&sid=${subtitleId}`
          ,{
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'content-type': 'text/json'
  }})
        .then((res) => {
          var notesSet = [];
          for (var i = 0; i < res.data.noteData.length; i++) {
            if (res.data.noteData[i].notes.length !== 0) {
              for (var j = 0; j < res.data.noteData[i].notes.length; j++) {
                var temp = {
                  sourceId: res.data.noteData[i].sourceId,
                  note: res.data.noteData[i].notes[j].note,
                  timestamp: res.data.noteData[i].notes[j].timestamp,
                  sourceDescription: `${
                    res.data.noteData[i].sourceIndex + 1
                  }. ${res.data.noteData[i].sourceDescription}`,
                  subtitleDescription: `${
                    res.data.noteData[i].subtitleIndex + 1
                  }. ${res.data.noteData[i].subtitleDescription}`,
                };
                notesSet.push(temp);
              }
            } else {
              continue;
            }
          }

          setNotes(notesSet);
        });
    } else {
      axios
        .get(
          `http://localhost:3000/user/sourcenotes?cid=${courseId}&sid=${currentSource._id}`
          ,{
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'content-type': 'text/json'
  }})
        .then((res) => {
          var notesSet = [];
          for (var i = 0; i < res.data.noteData.length; i++) {
            if (res.data.noteData[i].notes.length !== 0) {
              for (var j = 0; j < res.data.noteData[i].notes.length; j++) {
                var temp = {
                  sourceId: res.data.noteData[i].sourceId,
                  note: res.data.noteData[i].notes[j].note,
                  timestamp: res.data.noteData[i].notes[j].timestamp,
                  sourceDescription: `${
                    res.data.noteData[i].sourceIndex + 1
                  }. ${res.data.noteData[i].sourceDescription}`,
                  subtitleDescription: `${
                    res.data.noteData[i].subtitleIndex + 1
                  }. ${res.data.noteData[i].subtitleDescription}`,
                };
                notesSet.push(temp);
              }
            } else {
              continue;
            }
          }

          setNotes(notesSet);
        });
    }
  }, [currentNotesFilter, location.state, receivedData, currentSource]);

  //useEffect at the start to receive the data
  useEffect(() => {
    const courseId = location.state;
    //shouldnt we send the userId ??
    axios
      .get(
        `http://localhost:3000/course/${courseId}`
        ,{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'content-type': 'text/json'
}})
      .then((res) => {
        setReceivedData(res.data.course);
        setStudentSolutions(res.data.userData.exams);
        setCurrentSource(res.data.course.subtitles[0].sources[0]);
        setProgress(res.data.userData.percentageCompleted);
        setTotalSources(res.data.userData.totalSources);
      });
  }, [location.state]);
  const onSourceChangeHandler = (source) => {
    if(source.sourceType === 'Quiz' && currentSource.sourceType === 'Quiz' ){
      managerRef.current.refreshManager();
    }
    setCurrentSource(source);
  };
  const changeNotesFilter = (data) => {
    setCurrentNotesFilter(data);
  };

  const changeReportsFilter = (data) => {
    setCurrentReportsFilter(data);
  };

  const onSolveExamHandler = (receivedSolution) => {
    //should mark this as visited in the back and store the data
    //send the sourceId , examId ,userid and courseId
    var endPoint = `http://localhost:3000/user/solveexam/`;

    var sentData = {
      studentAnswers: receivedSolution,
      userid: "638a07cdbc3508481a2d7da9",
      courseid: receivedData._id,
      examid: currentSource.quiz._id,
    };
    axios
      .post(endPoint, sentData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      })
      .then((res) => { 
        console.log(res)
        var temp = {
          score: res.data.score,
          answers: res.data.answers,
          examId:currentSource.quiz._id,
          _id:receivedData._id,
        }
        console.log([...studentSolutions,temp])
        setStudentSolutions([...studentSolutions,temp]);
      })
      .catch((err) => {});
  };
  const nextSource = () => {
    for (var i = 0; i < receivedData.subtitles.length; i++) {
      for (var j = 0; j < receivedData.subtitles[i].sources.length; j++) {
        if (receivedData.subtitles[i].sources[j]._id === currentSource._id) {
          if (j === receivedData.subtitles[i].sources.length - 1) {
            if (i === receivedData.subtitles.length - 1) {
              setShowNextLessonAlert(true);
            } else {
              setCurrentSource(receivedData.subtitles[i + 1].sources[0]);
            }
          } else {
            setCurrentSource(receivedData.subtitles[i].sources[j + 1]);
          }
        }
      }
    }
  };
  const hideWarningAlert = () => {
    setShowNextLessonAlert(false);
  };
  const notesChangeHandler = (newNotes) => {
    setNotes(newNotes);
  };
  const onWatchHandler = () => {
    //will need the userID , sourceId, courseId
    //the userID and courseid are given from the navigation
    var endPoint = `http://localhost:3000/user/opensource/${receivedData._id}`;
    const userId = "638a07cdbc3508481a2d7da9";
    const submittedData = {
      userId: userId,
      sourceId: currentSource._id,
    };
    axios
      .patch(endPoint, submittedData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      })
      .then((res) => {});

    axios
      .get(
        `http://localhost:3000/user/progress/${receivedData._id}`
        ,{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'content-type': 'text/json'
}}
      )
      .then((res) => {
        setProgress(res.data.percentage);
      });
  };


  if (currentSource !== "") {
    var subtitle;
    for (var i = 0; i < receivedData.subtitles.length; i++) {
      for (var j = 0; j < receivedData.subtitles[i].sources.length; j++) {
        if (currentSource._id === receivedData.subtitles[i].sources[j]._id) {
          subtitle = receivedData.subtitles[i].description;
        }
      }
    }
  }
  //we will have an array of viewed sources
  var displayedSource;
  if (currentSource !== "") {
    if (currentSource.sourceType === "Video") {
      displayedSource = (
        <NotesManager
          currentNotesFilter={currentNotesFilter}
          changeNotesFilter={changeNotesFilter}
          currentReportsFilter={currentReportsFilter}
          changeReportsFilter={changeReportsFilter}
          studentId="638a07cdbc3508481a2d7da9"
          courseId={receivedData._id}
          currentSourceId={currentSource._id}
          source={currentSource.description}
          notes={notes}
          setNotes={notesChangeHandler}
          subtitle={subtitle}
          isVisible={true}
          link={currentSource.link}
          onWatch={onWatchHandler}
        />
      );
    } else {
      var studentAnswers;
      var grade;
      for (var k = 0; k < studentSolutions.length; k++) {
        if (studentSolutions[k].examId === currentSource.quiz._id) {
          studentAnswers = studentSolutions[k].answers;
          grade = studentSolutions[k].score;
        }
      }
      displayedSource = (
        <Fragment>
          {showNextLessonAlert && (
            <WarningAlert
              hide={hideWarningAlert}
              message={
                "This was the last course lesson,solve the exam to get your certificate"
              }
            ></WarningAlert>
          )}
          <ExamManager
            ref={managerRef}
            next={nextSource}
            exam={currentSource.quiz.exercises}
            studentAnswers={studentAnswers}
            grade={grade}
            onSolveExamHandler={onSolveExamHandler}
          ></ExamManager>
        </Fragment>
      );
    }
  }
  return (
    <Fragment>
      <NavBar />
      {/* <ProgressManager progress={progress} totalSources={totalSources} /> */}
      <div className="py-4 flex justify-center font-medium text-xl bg-gray-50">
        {receivedData.courseTitle}: {currentSource.description}
      </div>
      <div className="flex">
        <div className="video/exam md:w-[70%] w-full mb-4 md:mb-0">
          {displayedSource}
        </div>
        <div className="md:w-[30%]">
          <ContentCourseView
            progress={progress}
            totalSources={totalSources}
            courseDuration={receivedData.totalMins}
            content={receivedData.subtitles}
            onClick={onSourceChangeHandler}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default CourseViewPage;
