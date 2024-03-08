import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


function PersonCard(props) {

    return (
        <Card sx={{ maxWidth: 150 }}>
            <CardMedia
                sx={{ height: 200, width: "100%" }}
                image={"https://starwars-visualguide.com/assets/img/characters/" + props.datos.url.split("/").slice(-2)[0] + ".jpg"}
                title={props.datos.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.datos.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Peso: {props.datos.mass}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Altura: {props.datos.height}
                </Typography>
                
            </CardContent>
        </Card>


    );

}

export default PersonCard;