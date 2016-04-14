"use strict";
var types = require('./types');
function addTodo(text) {
    return { type: types.ADD_TODO, text: text };
}
exports.addTodo = addTodo;
function deleteTodo(id) {
    return { type: types.DELETE_TODO, id: id };
}
exports.deleteTodo = deleteTodo;
function editTodo(id, text) {
    return { type: types.EDIT_TODO, id: id, text: text };
}
exports.editTodo = editTodo;
function completeTodo(id) {
    return { type: types.COMPLETE_TODO, id: id };
}
exports.completeTodo = completeTodo;
function completeAll() {
    return { type: types.COMPLETE_ALL };
}
exports.completeAll = completeAll;
function clearCompleted() {
    return { type: types.CLEAR_COMPLETED };
}
exports.clearCompleted = clearCompleted;
//# sourceMappingURL=actions.js.map