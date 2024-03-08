import { CircularProgress, Pagination, Grid } from "@mui/material";
import PersonCard from "./PersonCard";
import { useState, useEffect } from 'react';

function PersonPage() {
    const [page, setPage] = useState(1);
    const [isError, setIsError] = useState(null);
    const [datosPagina, setDatosPagina] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event, value) => {
        setPage(value);
        setIsLoading(true);
    };

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await fetch("https://swapi.dev/api/people/?page=" + page);

                if (response.ok) {
                    const datos = await response.json();

                    setDatosPagina(datos); // Guardar datos
                    setIsError(null); // Limpiar error

                } else {
                    setIsError("Página de datos no recuperada");
                }
            } catch (error) {
                setIsError("No pudimos hacer la solicitud para obtener los datos de los personajes");
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();

    }, [page]);

    let numPaginas = 0; // Número de páginas en total
    if (datosPagina != null) {
        numPaginas = Math.ceil(datosPagina.count / 10);
    }

    let listaPersonajes = [];
    if (datosPagina != null) {
        listaPersonajes = datosPagina.results.map(personaje =>
            <Grid item key={personaje.url.split("/").slice(-2)[0]} md={3} xs={6}>
                <PersonCard datos={personaje} />
            </Grid>
        );
    }

    if (isError != null) {
        return <h3>{isError}</h3>
    }

    return (
        <>
            <h3>Personajes de Stars Wars</h3>

            <Pagination count={numPaginas} page={page} onChange={handleChange} showFirstButton showLastButton />
            
            {isLoading ? <CircularProgress />

                :
                <Grid container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center">
                    {listaPersonajes}
                </Grid>
            }

            <Pagination count={numPaginas} page={page} onChange={handleChange} showFirstButton showLastButton />
        </>
    );
}

export default PersonPage;