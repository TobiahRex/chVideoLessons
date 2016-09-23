import Types from './actionTypes';

const selectCohort = (cohort) =>
({ type: Types.SET_ACTIVE_COHORT, cohort });

const createNewLesson = (lesson) =>
({ type: Types.CREATE_NEW_LESSON, lesson });

const saveLessonAssignments = (assignments) =>
({ type: Types.UPDATE_COHORT_ASSIGNMENTS, assignments });

const removeLesson = (lessonID) =>
({ type: Types.REMOVE_LESSON, lessonID });

export default {
  selectCohort, // change the stores 'active cohort' - STORE
  createNewLesson, // generate blank lesson - STORE

  saveLessonAssignments, // saves & updates respective lessons - API
  removeLesson // removes chapters, sections, notes, and comments - API};
};
