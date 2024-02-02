import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../services/api";
import { FiMinusCircle } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";


const Container = styled.div`
    width: 100%;
    height: 100%;
    
    padding: 0 12.4rem;


    .processDetails {
        display: flex;
        flex-direction: column;

        h2 {
            text-align: center;
            color: #09244B;
            font-size: 4rem;
        }

        .subProcess {
            display: flex;
            flex-direction: column;

        }
    }

    .processTitle {
        display: flex;
        justify-content: space-between;

        margin-top: 15rem;
    }
`

const FaseTitle = styled.div`

    img {
        width: 25rem;
        height: 25rem,;
    }

    h3 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
        color: #09244B;
    }
    
`;

const SubPhaseTitle = styled.div`
    
    p {
        margin-bottom: .6rem;
        font-weight: 600;

        color: ${(props) => (props.done === 1 ? 'green' : '')};
        cursor: ${(props) => (props.done === 1 ? 'pointer' : 'default')};
    }

    .nameAndIcon {
        display: flex;
        gap: 2rem;

        svg {
            margin-top: 3px;
            width: 2rem;
            height: 2rem;
        }
    }
`



export function Home() {
    const [data, setData] = useState(null)

    const params  = useParams()

    function handleWhatsAppMessage(subphase) {
        const phoneNumber = '5531984702550';
        const rastreio = data ? data.rastreio : '';  // Substitua pelo seu número de WhatsApp
        const message = `A etapa "${subphase.name}" foi concluída, você pode rastrear seu pedido através do código de rastreio: ${rastreio}`;

        if (subphase.done === 1) {
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappLink, '_blank');
        }
    }

    useEffect(() => {
        async function fetchProcess() {
            const response = await api.get(`/process/${params.rastreio}`);
            setData(response.data);
            console.log(response.data);
        }
        fetchProcess();
    }, []);

    return (
        <Container>
            <div className="processDetails">
                <h2>{data ? data.nome : "Carregando..."}</h2>
                {data ? (
                    <>
                        <div className="processTitle">
                            {data.phases.map((phase) => (
                                <div key={phase.id}>
                                    <FaseTitle done={phase.done} onClick={() => handleWhatsAppMessage(phase)}>
                                        {phase.image && <img src={phase.image} alt={phase.name} />}
                                        <h3>{phase.name}</h3>
                                    </FaseTitle>
                                    {phase.subphases && phase.subphases.length > 0 && (
                                        <div className="subPhaseContainer">
                                            {phase.subphases.map((subphase) => (
                                                <SubPhaseTitle
                                                    key={subphase.id}
                                                    done={subphase.done}
                                                    onClick={() => handleWhatsAppMessage(subphase)}
                                                >
                                                    <div className="nameAndIcon">
                                                        <p>{subphase.name}</p>
                                                        {subphase.done === 1 ? <FaRegCheckCircle color="green" /> : <FiMinusCircle />}
                                                    </div>
                                                </SubPhaseTitle>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>Carregando dados...</p>
                )}
            </div>
        </Container>
    )
}