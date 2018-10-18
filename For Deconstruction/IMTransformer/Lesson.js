function Lesson(lessonString){
    var firstIndex = lessonString.indexOf('/');
    var secondIndex = lessonString.lastIndexOf('/');

    this.lessonString = lessonString;
    this.grade = lessonString.substring(0, firstIndex);
    this.quarter = lessonString.substring(firstIndex + 1, secondIndex);
    this.lessonNumber = lessonString.substring(secondIndex + 1, lessonString.length);

    var lessonPath = parseInt(this.grade) - 5 + "/" + this.quarter + "/" + this.lessonNumber + "/";
    this.lessonPath = lessonPath;
    var indexPath = lessonPath + "index.html";
    var practicePath = lessonPath + "practice.html";
    var preparationPath = lessonPath + "preparation.html";

    var files = {};
    files.teacherIndex = "teachers/" + indexPath;
    files.teacherPractice = "teachers/" + practicePath;
    files.teacherPreparation = "teachers/" + preparationPath;

    files.studentIndex = "students/" + indexPath;
    files.studentPractice = "students/" + practicePath;

    this.files = files;
}

module.exports = Lesson;