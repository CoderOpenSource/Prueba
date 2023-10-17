import { useEffect } from "react";
import { getAllTareas } from "../api/tareas.api";
export function TareasList()
{
    const [tareas, setTareas] = useState([]);
    useEffect(() => {
        async function loadTareas() {
            const res = await getAllTareas();
            setTareas(res.data);
        }
        loadTareas();
        console.log("Pagina Cargada");
    }, []);
    return <div>
        {tareas.map(tarea => (
            <div key ={tarea.id}>
                <h1>{tarea.title}  </h1>
                <h1> {tarea.descripcion} </h1>
            </div>
        )}
     </div>
}