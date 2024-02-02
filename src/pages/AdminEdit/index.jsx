import { useEffect, useState } from "react"
import styled from "styled-components"
import { api } from "../../services/api"
import { useParams } from "react-router-dom"
import { Input } from "../../components/Input"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .editSection {
        margin-top: 20rem;
    }

    .subphases {
        display: flex;
        justify-content: space-between;
        gap: 3rem;
        
    }

`

export function AdminEdit() {
    const [subphases, setSubphases] = useState([]);

    const params = useParams();

    useEffect(() => {
        async function fetchProcess() {
            const response = await api.get(`/process/${params.id}`);

            if (!response.data.phases) {
                console.error("Fases não encontradas");
                return;
            }

            // Aqui você deve mapear todas as subfases
            const allSubphases = response.data.phases
                .flatMap(phase => phase.subphases);

            setSubphases(allSubphases);

            console.log(response.data);
        }

        fetchProcess();
    }, [params.id]);

    const handleCheckboxChange = (subphaseId) => {
        setSubphases((prevSubphases) =>
            prevSubphases.map((subphase) =>
                subphase.id === subphaseId ? { ...subphase, done: !subphase.done } : subphase
            )
        );
    };

    const handleSaveChanges = async () => {
        try {
            await Promise.all(
                subphases.map(async (subphase) => {
                    await api.put(`/subphases/${subphase.id}`, { done: subphase.done });
                })
            );
            alert('Alterações salvas com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar as alterações:', error);
            alert('Erro ao salvar as alterações. Consulte o console para mais detalhes.');
        }
    };

    return (
        <Container>
            <div className="editSection">
                <h2>Subfases:</h2>
                {subphases.map(subphase => (
                    <div key={subphase.id} className="subphases">
                        <p>Nome: {subphase.name}</p>
                        <label>
                            <input
                                type="checkbox"
                                checked={subphase.done}
                                onChange={() => handleCheckboxChange(subphase.id)}
                            />
                        </label>
                    </div>
                ))}
                <button onClick={handleSaveChanges}>Salvar Alterações</button>
            </div>
        </Container>
    );
}