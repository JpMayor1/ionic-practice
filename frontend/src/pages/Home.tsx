import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import "./Home.css";
import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";
import { TodoType } from "../types/todoType";
import { closeCircleOutline, createOutline, saveOutline, trashOutline } from "ionicons/icons";

const Home: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todo, setTodo] = useState("");
  const [edit, setEdit] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { getTodos, addTodo, updateTodo, deleteTodo } = useApi();
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    getTodos().then((data) => setTodos(data));
  }, []);

  const addTodoFunc = () => {
    try {

      if (!todo) {
        presentAlert({
          message: "Please enter a todo",
          buttons: ['Close'],
        })
        return;
      }

      setLoading(true)
      addTodo(todo).then((data) => {
        setTodos([...todos, data.todo]);
        setTodo("");
        presentAlert({
          message: data.message,
          buttons: ['Close'],
        })
      });
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const updateTodoFunc = (id: string) => {
    try {

      if (!newTodo) {
        presentAlert({
          message: "Please enter a todo",
          buttons: ['Close'],
        })
        return;
      }

      setLoading(true)
      updateTodo(id, newTodo).then((data) => {
        setTodos(todos.map((todo) => (todo._id === id ? { ...todo, todo: newTodo } : todo)));
        setEdit("");
        setNewTodo("");
        presentAlert({
          message: data.message,
          buttons: ['Close'],
        })
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const deleteTodoFunc = (id: string) => {
    try {
      setLoading(true)
      deleteTodo(id).then((data) => {
        setTodos(todos.filter((todo) => todo._id !== id));
        presentAlert({
          message: data.message,
          buttons: ['Close'],
        })
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Todo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonItem>
          <IonInput
            type="text"
            placeholder="Enter todo"
            value={todo}
            onIonChange={(e) => setTodo(e.detail.value!)}
          ></IonInput>
          <IonButton onClick={addTodoFunc}>Add</IonButton>
        </IonItem>
        <IonList>
          {todos.length > 0 ? (
            <>
              {todos.map((todo: any) => (
                <IonItem key={todo._id}>
                  {edit === todo._id ? (
                    <>
                      <IonInput
                        type="text"
                        placeholder="Update todo"
                        value={newTodo}
                        onIonChange={(e) => setNewTodo(e.detail.value!)}
                      ></IonInput>
                      <IonButton fill="outline" color="success" onClick={() => updateTodoFunc(todo._id)}><IonIcon icon={saveOutline} /></IonButton>
                      <IonButton color="danger" onClick={() => setEdit("")}><IonIcon icon={closeCircleOutline} /></IonButton>
                    </>
                  ) : (
                    <>
                      <IonLabel >
                        {todo.todo}
                      </IonLabel>
                      <IonButton fill="outline" color="success" onClick={() => setEdit(todo._id)}><IonIcon icon={createOutline} /></IonButton>
                      <IonButton color="danger" onClick={() => deleteTodoFunc(todo._id)}><IonIcon icon={trashOutline} /></IonButton>
                    </>
                  )}
                </IonItem>
              ))}
            </>
          ) : (
            <IonLabel class="ion-text-center">
              <h3>No todos yet</h3>
            </IonLabel>
          )}

        </IonList>
        <IonLoading isOpen={loading} spinner={"bubbles"} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
