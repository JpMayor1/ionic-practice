const useApi = () => {
    const url = 'http://localhost:5000/';

    const getTodos = async () => {
        const response = await fetch(url);
        return response.json();
    };

    const addTodo = async (todo: string) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo }),
        });
        return response.json();
    };

    const updateTodo = async (id: string, todo: string) => {
        const response = await fetch(`${url}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo }),
        });
        return response.json();
    };

    const deleteTodo = async (id: string) => {
        const response = await fetch(`${url}${id}`, {
            method: 'DELETE',
        });
        return response.json();
    };

    return { getTodos, addTodo, updateTodo, deleteTodo };
}

export default useApi;