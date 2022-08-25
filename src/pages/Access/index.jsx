import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styles from './Access.module.scss';
import axios from '../../axios';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/User';

export const Access = () => {
  const { id } = useParams();
  const { data } = useSelector((state) => state.user);
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      programId: id,
      email: isAuth ? data.email : '',
      hash: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (values) => {
    try {
      await axios.patch('/access', values).then(() => navigate(`/programs/${id}`));
    } catch (error) {
      alert('Не вдається отримати доступ.');
    }
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Отримати доступ
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isAuth ? (
          <TextField
            className={styles.field}
            label="E-Mail"
            fullWidth
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', { required: 'Вкажіть вашу пошту' })}
          />
        ) : null}
        <TextField
          className={styles.field}
          label="Код доступу"
          error={Boolean(errors.hash?.message)}
          helperText={errors.hash?.message}
          {...register('hash', { required: 'Вкажіть код доступу' })}
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Отримати доступ
        </Button>
      </form>
    </Paper>
  );
};
