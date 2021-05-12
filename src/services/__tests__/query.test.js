/* eslint-env jest */

// This commands loads the mocked request.js as defined in __mocks__/request.js

const survey = require('../news');

jest.mock('../query')

// A positive case for apiGetAllSurveys
describe('#apiGetAllSurveys() using Promises', () => {
    it('should load surveys data', () => {

        return survey.apiGetAllSurveys('surveys')
            .then(data => {
                expect(data).toBeDefined()
                expect(data.entity.survey_results[0].name).toEqual('Survey A')
            })
    })
});

// A negative case for apiGetAllSurveys
describe('#apiGetAllSurveys() using Promises', () => {
    it('should load surveys data', () => {

        return survey.apiGetAllSurveys('surveys')
            .then(data => {
                expect(data).toBeDefined()
                expect(data.entity.survey_results[0].name).toEqual('Survey 100')
            })
    })
});
