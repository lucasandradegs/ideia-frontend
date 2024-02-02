import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;

    background-color: ${({theme}) => theme.COLORS.DARK_900};

    /* margin-top: 0.8rem; */
    border-radius: 0.8rem;
    gap: 1.4rem;
    padding: 0 1.4rem;

    > input {
        width: 100%;
        height: 5.6rem;
        /* padding: 1.2rem; */

        color: ${({theme}) => theme.COLORS.LIGHT_300}; 
        background: transparent;
        border: 0;

        &::placeholder {
            color: ${({theme}) => theme.COLORS.LIGHT_500};
        }
    }
`;