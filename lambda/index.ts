import {
    increaseVisitCount,
    resetVisitCountToZero,
    getVisitCount
} from './VisitCount';
//
//
import { 
    addQuestion, 
    deleteQuestion,
    addAllQuestions, 
    deleteAllQuestions,
    getAllQuestions,
    updateQuestionAnswerPercentage
} from './QuestionAnswer';
//
//
import {
    addFlipCount,
    deleteFlipCount,
    addAllFlipCounts,
    deleteAllFlipCounts,
    getAllFlipCounts,
    increaseFlipCount
} from './FlipCount';


exports.handler = async (event: any) => {

    switch (event.info.fieldName) {
        case "increaseVisitCount":
            return await increaseVisitCount();

        case "resetVisitCountToZero":
            return await resetVisitCountToZero();

        case "getVisitCount":
            return await getVisitCount();
        //
        //
        case "addQuestion":
            return await addQuestion(event.arguments);

        case "deleteQuestion":
            return await deleteQuestion(event.arguments);

        case "addAllQuestions":
            return await addAllQuestions(event.arguments);

        case "deleteAllQuestions":
            return await deleteAllQuestions();

        case "getAllQuestions":
            return await getAllQuestions();

        case "updateQuestionAnswerPercentage":
            return await updateQuestionAnswerPercentage(event.arguments);
        //
        //
        case "addFlipCount":
            return await addFlipCount(event.arguments);

        case "deleteFlipCount":
            return await deleteFlipCount(event.arguments);

        case "addAllFlipCounts":
            return await addAllFlipCounts(event.arguments);

        case "deleteAllFlipCounts":
            return await deleteAllFlipCounts();

        case "getAllFlipCounts":
            return await getAllFlipCounts();

        case "increaseFlipCount":
            return await increaseFlipCount(event.arguments);

        default:
            return null;
    }

}