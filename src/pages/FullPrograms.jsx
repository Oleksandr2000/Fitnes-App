import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Post';
import axios from '../axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/User';

import styles from '../components/Programs/Programs.module.scss';

export const FullPrograms = () => {
  const { id } = useParams();
  const [programs, setPrograms] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { data } = useSelector((state) => state.user);
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    axios
      .get(`/program/${id}`)
      .then((res) => {
        setPrograms(res.data[0]);
      })
      .catch(() => {
        console.log('error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

  if (!isAuth) {
    return (
      <Card>
        <CardMedia component="img" height="300px" alt="green iguana" image={programs.imageUrl} />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {programs.title}
          </Typography>
          <Typography gutterBottom variant="h6" color="text.secondary">
            {programs.description}
          </Typography>
          <hr />
          <Typography variant="body4" color="text.secondary">
            {programs.preview}
          </Typography>
          {!isAuth ? (
            <Typography variant="h6" color="text.secondary">
              Для того щоб отримати доступ потрібно авторизуватись
            </Typography>
          ) : null}
        </CardContent>
        {!isAuth ? (
          <CardActions>
            <Button variant="outlined" size="medium">
              {programs.price} грн.
            </Button>
            <Button variant="contained" size="medium" disabled>
              Получить доступ
            </Button>
          </CardActions>
        ) : (
          <CardActions>
            <Button variant="outlined" size="medium">
              {programs.price} грн.
            </Button>
            <Link className={styles.link} to={`/access/${id}`}>
              <Button variant="contained" size="medium">
                Получить доступ
              </Button>
            </Link>
          </CardActions>
        )}
      </Card>
    );
  }

  const accessAllowed = data.access.includes(id.toString());

  if (!accessAllowed) {
    return (
      <Card>
        <CardMedia component="img" height="300px" alt="green iguana" image={programs.imageUrl} />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {programs.title}
          </Typography>
          <Typography gutterBottom variant="h6" color="text.secondary">
            {programs.description}
          </Typography>
          <hr />
          <Typography variant="body4" color="text.secondary">
            {programs.preview}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" size="medium">
            {programs.price} грн.
          </Button>
          <Link className={styles.link} to={`/access/${id}`}>
            <Button variant="contained" size="medium">
              Получить доступ
            </Button>
          </Link>
        </CardActions>
      </Card>
    );
  }

  return (
    <Card>
      <CardMedia component="img" height="300px" alt="green iguana" image={programs.imageUrl} />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {programs.title}
        </Typography>
        <Typography gutterBottom variant="h6" color="text.secondary">
          {programs.description}
        </Typography>
        <Typography variant="body4" color="text.secondary">
          {programs.preview}
        </Typography>
      </CardContent>
      {programs.workouts.map((obj, index) => (
        <Accordion key={index} style={{ margin: 15 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography>{obj.week}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{obj.instructions}</Typography>
            {obj.workout.map((obj, index) => (
              <Accordion key={index} style={{ margin: 15 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography>{obj.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={styles.card_wrapper}>
                    {obj.exercise.map((item, index) => (
                      <Card sx={{ maxWidth: 255 }} key={index}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="160"
                            image={item.image}
                            alt="exercise"
                          />
                          <CardContent>
                            <Typography variant="h5" component="div">
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.description}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Card>
  );
};
