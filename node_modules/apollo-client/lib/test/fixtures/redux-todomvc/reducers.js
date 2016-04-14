"use strict";
var redux_1 = require('redux');
var lodash_1 = require('lodash');
var types_1 = require('./types');
var initialState = [
    {
        text: 'Use Redux',
        completed: false,
        id: 0,
    },
];
function todos(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types_1.ADD_TODO:
            return [
                {
                    id: state.reduce(function (maxId, todo) { return Math.max(todo.id, maxId); }, -1) + 1,
                    completed: false,
                    text: action.text
                }
            ].concat(state);
        case types_1.DELETE_TODO:
            return state.filter(function (todo) {
                return todo.id !== action.id;
            });
        case types_1.EDIT_TODO:
            return state.map(function (todo) {
                return todo.id === action.id ?
                    lodash_1.assign({}, todo, { text: action.text }) :
                    todo;
            });
        case types_1.COMPLETE_TODO:
            return state.map(function (todo) {
                return todo.id === action.id ?
                    lodash_1.assign({}, todo, { completed: !todo.completed }) :
                    todo;
            });
        case types_1.COMPLETE_ALL:
            var areAllMarked_1 = state.every(function (todo) { return todo.completed; });
            return state.map(function (todo) { return lodash_1.assign({}, todo, {
                completed: !areAllMarked_1
            }); });
        case types_1.CLEAR_COMPLETED:
            return state.filter(function (todo) { return todo.completed === false; });
        default:
            return state;
    }
}
var rootReducer = redux_1.combineReducers({
    todos: todos
});
exports.rootReducer = rootReducer;
//# sourceMappingURL=reducers.js.map