import { useEffect, useState } from "react"
import styled from "styled-components"
import { api } from "../../services/api"
import { Link } from "react-router-dom"
import { PiPencilSimpleBold } from "react-icons/pi"

const Container = styled.div`
    padding: 0 12.4rem;
    width: 100%;
    height: 100%;

    .adminContent {
        display: flex;
        justify-content: space-between;
        margin-top: 15rem;
    }

    .processCard {
        padding: 5rem;
        border-radius: 2rem;
        background: #09244B;
        color: #E1E1E6;

        height: 100%;

        h2 {
            margin-top: 3rem;
        }

        p:nth-child(1) {
            display: flex;
            flex-direction: row-reverse;
            color: #E1E1E6;
        }

        p:nth-child(3) {
            margin-top: 3rem;
        }
    }
`

export function AdminPage() {
    const [process, setProcess] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        async function fetchProcess() {
            const response = await api.get(`/process?nome=${search}`)
            setProcess(response.data)
            console.log(response.data)
        }

        fetchProcess()
    }, [search])


    return (
        <Container>
            <div className="adminContent">
                {process.length > 0 ? (
                    process.map((process) => (
                        <Link to={`/details/${process.id}`} key={process.id}>
                            <div key={process.id} className="processCard">
                                <p><PiPencilSimpleBold size={24} /></p>
                                <h2>{process.nome}</h2>
                                <p>Cliente: {process.user_name}</p>
                                <p>Rastreio: {process.rastreio}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>Nenhum processo encontrado.</p>
                )}
            </div>
        </Container>
    )
}