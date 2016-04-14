export declare function addTodo(text: any): {
    type: string;
    text: any;
};
export declare function deleteTodo(id: any): {
    type: string;
    id: any;
};
export declare function editTodo(id: any, text: any): {
    type: string;
    id: any;
    text: any;
};
export declare function completeTodo(id: any): {
    type: string;
    id: any;
};
export declare function completeAll(): {
    type: string;
};
export declare function clearCompleted(): {
    type: string;
};
