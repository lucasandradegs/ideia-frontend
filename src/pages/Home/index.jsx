import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

const Container = styled.div`
    padding: 0 12.4rem;


    .processDetails {
        display: flex;
        flex-direction: column;
        align-items: center;

        h2 {
            color: #000;
        }

        .subProcess {
            display: flex;
            flex-direction: column;

        }
    }

    img {
        width: 31.5rem;
        height: 31.5rem;
    }
`

const FaseTitle = styled.h3`
    color: ${(props) => (props.done === 1 ? 'green' : '')};
    cursor: ${(props) => (props.done === 1 ? 'pointer' : 'default')};
`;



export function Home() {
    const [data, setData] = useState(null)

    function handleWhatsAppMessage(phase) {
        const phoneNumber = '5531984702550';
        const rastreio = data ? data.rastreio : '';  // Substitua pelo seu número de WhatsApp
        const message = `${phase.name} concluída, você pode rastrear seu pedido através do código de rastreio: ${rastreio}`;

        if (phase.done === 1) {
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappLink, '_blank');
        }
    }

    useEffect(() => {
        async function fetchProcess() {
            const response = await api.get(`/process/1`)
            setData(response.data)
            console.log(response.data)
        }
        fetchProcess()
    }, [])

    return (
        <Container>
            <div className="processDetails">
                <img src="/images/truck.svg" alt="" />
                <div className="processTitle">
                    {data ? (
                        <>
                            <h2>{data.nome}</h2>
                            {data.phases.map((phase) => (
                                <FaseTitle
                                    key={phase.id}
                                    done={phase.done}
                                    onClick={() => handleWhatsAppMessage(phase)}
                                >
                                    {phase.name}
                                </FaseTitle>
                            ))}
                        </>
                    ) : (
                        <p>carreagando dados...</p>
                    )}
                </div>
            </div>
        </Container>
    )
}