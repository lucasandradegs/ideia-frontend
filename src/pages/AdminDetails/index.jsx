import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { api } from "../../services/api";
import { PiPencilSimpleBold } from "react-icons/pi";

const Container = styled.div`
    padding: 0 12.4rem;
    height: 100vh;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* Adicionado para centralizar verticalmente */
    height: 100%; /* Adicionado para ocupar 100% da altura do Content */

    .Container {
        width: 100%;
        background: #09244B;

        border-radius: .7rem;

        color: #E1E1E6;

        .titleSection {
            text-align: center;
            margin-top: 3rem;

            a {
                padding-left: 25rem;
                position: absolute;
            }

            p:nth-child(3) {
                margin-top: 2rem;
            }
        }

        .phasesSection {
            h2 {
                text-align: center;
                margin-top: 2rem;
            }
        }

    }
`

export function AdminDetailsPage() {
    const [data, setData] = useState(null)

    const params = useParams()

    useEffect(() => {
        async function fetchProcess() {
            const response = await api.get(`/process/${params.id}`)
            setData(response.data)
            console.log(response.data)
        }

        fetchProcess();
    }, [])

    return (
        <Container>
            <Content>
                <div className="Container">
                    <div className="titleSection">
                        {data && (
                            <Link to={`/edit/${data.id}`}>
                                <p><PiPencilSimpleBold size={40} color="white"/></p>
                            </Link>
                        )}
                        <h2>{data ? data.nome : "Carregando..."}</h2>
                        <p>Cliente: {data ? data.user_name : "Carregando..."}</p>
                        <p>Rastreio: {data ? data.rastreio : "Carregando..."}</p>
                    </div>
                    <div className="phasesSection">
                        <h2>Etapas:</h2>
                        {data && data.phases ? (
                            <>
                                {data.phases.map((phase) => (
                                    <div key={phase.id} className="phaseTitle">
                                        <h3>{phase.name}</h3>
                                        {phase.subphases ? (
                                            <div className="subPhases">
                                                {phase.subphases.map((subphase) => (
                                                    <p key={subphase.id}>{subphase.name}</p>
                                                ))}
                                            </div>
                                        ) : (
                                            <p>Sem subfases</p>
                                        )}
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p>Carregando fases...</p>
                        )}
                    </div>
                </div>
            </Content>
        </Container>
    )
}