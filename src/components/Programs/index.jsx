import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActions } from '@mui/material';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import styles from './Programs.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/User';

export default function Programs({ _id, title, imgUrl, description, coach, price }) {
  const isAuth = useSelector(selectIsAuth);
  const { data } = useSelector((state) => state.user);

  return (
    <Card className={styles.root}>
      <CardMedia component="img" alt="img" image={imgUrl} className={styles.image} />
      <CardContent>
        <Typography gutterBottom component="div" className={styles.title}>
          <Link to={`/programs/${_id}`}>{title}</Link>
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {coach}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          {description}
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
            {price} грн.
          </Button>
          <Button variant="contained" size="medium" disabled>
            <Link className={styles.link} to={`/access/${_id}`}>
              Получить доступ
            </Link>
          </Button>
        </CardActions>
      ) : (
        <CardActions>
          {!data.access.includes(_id.toString()) ? (
            <>
              <Button variant="outlined" size="medium">
                {price} грн.
              </Button>
              <Link className={styles.link} to={`/access/${_id}`}>
                <Button variant="contained" size="medium">
                  Получить доступ
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link className={styles.start} to={`/programs/${_id}`}>
                <Button variant="contained" size="medium">
                  Розпочати тренування
                </Button>
              </Link>
            </>
          )}
        </CardActions>
      )}
    </Card>
  );
}
